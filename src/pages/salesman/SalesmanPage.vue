<script setup lang="ts">
import SalesmanLayout from '@/layouts/SalesmanLayout.vue'
import { useAttendance } from '@/composables/useAttendance'
import { useOmset } from '@/composables/useOmset'
import { onMounted } from 'vue'
import { formatRupiah } from '@/helper/formatRupiah'
import { useStore } from '@/composables/useStore'
import { useCustomer } from '@/composables/customer/useCustomer'
import { FileText } from 'lucide-vue-next'
import SalesmanButtonNav from '@/components/SalesmanButtonNav.vue'
import { useInbox } from '@/composables/useInbox';
import { Trash2, Pencil, Eye } from 'lucide-vue-next';



const { getInbox, keyword, inboxData, isLoadingGet, links } = useInbox()
const { attendance, getType, type, selectedAttendance } = useAttendance()
const { getOmset, dataOmset } = useOmset()
const { storeBySalesman, dataStoreBySalesman, isLoading } = useStore()
const { getCustomerBySalesmanMonthly, dataCustomerBySalesmanMonthly } = useCustomer()



onMounted(async () => {
    await getType()
    await getOmset()
    await storeBySalesman()
    await getCustomerBySalesmanMonthly()
    await getInbox()
})

const getPage = (url: string) => {
    if (!url) return
    const params = new URL(url).searchParams
    return Number(params.get('page'))
}
</script>

<template>
    <SalesmanLayout>
        <div>
            <SalesmanButtonNav class="mb-4" />
        </div>
        <!-- ABSENSI -->
        <div class="mb-6 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
            <section class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                <h3 class="text-sm font-semibold text-neutral-800">
                    Attendance/Absensi
                </h3>
                <span class="text-xs text-neutral-500">
                    Today
                </span>
            </section>

            <form class="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center" @submit.prevent="attendance">
                <select v-model="selectedAttendance"
                    class="w-full sm:flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
                    <option v-for="t in type" :key="t.id" :value="t.id">
                        {{ t.type }}
                    </option>
                </select>

                <button type="submit" class="btn">
                    Submit
                </button>
            </form>
        </div>

        <!-- TABLE TARGET -->
        <div class="overflow-x-auto mb-6 rounded-lg border border-neutral-200 bg-white shadow-sm">
            <section class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                <h3 class="text-sm font-semibold text-neutral-800">
                    Your Target
                </h3>
                <span class="text-xs text-neutral-500">
                    Monthly
                </span>
            </section>

            <table class="min-w-[1200px] w-full border-collapse text-sm">
                <thead class="bg-neutral-100 border-b border-neutral-300">
                    <tr class="text-left text-neutral-700">
                        <th class="px-4 py-3 font-medium whitespace-nowrap">No</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Code</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Name</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Target Value</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Target Harian</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Terealisasi</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Persentase</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Hari Kerja</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(d, i) in dataOmset" :key="i"
                        class="border-b border-neutral-200 transition hover:bg-neutral-50">
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ i + 1 }}
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ d.salesman_code }}
                        </td>
                        <td class="px-4 py-3 text-neutral-700 whitespace-nowrap font-medium">
                            {{ d.salesman }}
                        </td>
                        <td v-if="d.target !== 0" class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ formatRupiah(d.target) }}
                        </td>
                        <td v-else class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            Target belum ditentukan
                        </td>
                        <td v-if="d.target_harian !== 0" class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ formatRupiah(d.target_harian) }}
                        </td>
                        <td v-else class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            Target belum ditentukan
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ formatRupiah(d.terealisasi) }}
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ d.persentase_total }}%
                        </td>
                        <td v-if="!d.total_hari_kerja || d.total_hari_kerja == 0"
                            class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            Total hari kerja belum ditentukan
                        </td>
                        <td v-else class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ d.total_hari_kerja }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- HISTORY PO -->
        <div class="bg-white p-2 rounded mb-4">
            <section class="">
                <input v-model="keyword" type="text" name="" id="" class="input" placeholder="Search Inbox">
            </section>
            <section class="bg-white rounded-md shadow-sm overflow-x-auto">
                <table class="min-w-[1200px] w-full border-collapse text-sm">
                    <thead>
                        <tr class="text-left text-neutral-700">
                            <th class="px-3 py-2 whitescape-nowrap">No</th>
                            <th class="px-3 py-2 whitescape-nowrap">Salesman</th>
                            <th class="px-3 py-2 whitescape-nowrap">Salesman Code</th>
                            <th class="px-3 py-2 whitescape-nowrap">Store</th>
                            <th class="px-3 py-2 whitespace-nowrap">Address</th>
                            <th class="px-3 py-2 whitespace-nowrap">Invoice</th>
                            <th class="px-3 py-2 whitescape-nowrap">Status1</th>
                            <th class="px-3 py-2 whitescape-nowrap">Status2</th>
                            <th class="px-3 py-2 whitescape-nowrap">Actions</th>

                        </tr>
                    </thead>
                    <tbody v-if="!isLoadingGet">
                        <tr v-for="(p, i) in inboxData" :key="i"
                            class="border-b border-neutral-200 hover:bg-neutral-50">
                            <td class="px-3 py-2 whitescpae-nowrap">{{ i + 1 }}</td>
                            <span :class="{
                                'bg-red-500 text-white rounded px-1': p.salesman.deleted_at
                            }">
                                {{ p.salesman.name }}
                            </span>

                            <td class="px-3 py-2 whitescpae-nowrap">{{ p.salesman.code }}</td>
                            <td class="px-3 py-2 whitescpae-nowrap">{{ p.customer.store_name }}</td>
                            <td class="px-3 py-2 whitescpae-nowrap">{{ p.customer.address }}</td>
                            <td class="px-3 py-2 whitescpae-nowrap">INV-{{ p.created_at }}</td>
                            <td class="px-3 py-2 whitescpae-nowrap"
                                :class="[p.status1 == 'rejected' ? 'text-red-500' : '', p.status1 == 'approved' ? 'text-green-500' : 'text-amber-500']">
                                {{
                                    p.status1 }}
                            </td>
                            <td class="px-3 py-2 whitescpae-nowrap"
                                :class="[p.status2 == 'rejected' ? 'text-red-500' : '', p.status2 == 'approved' ? 'text-green-500' : 'text-amber-500']">
                                {{
                                    p.status2 }}
                            </td>
                            <td class="px-3 py-2 whitescpae-nowrap">
                                <div class="gap-2 flex">

                                    <routerLink :to="`/salesman/request/detail?id=${p.id}`"
                                        class="bg-sky-500 p-1 rounded text-white cursor-pointer">
                                        <Eye :size="20" />
                                    </routerLink>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="isLoadingGet"
                    class="h-[450px] w-full flex justify-center items-center text-2xl text-slate-700 font-semibold">
                    Loading...
                </div>
            </section>


            <div class="flex items-center gap-1 mt-4 flex-wrap">
                <button v-for="(link, i) in links" :key="i" :disabled="!link.url" v-html="link.label"
                    @click="getInbox(getPage(link.url))" class="
      min-w-[36px]
      h-9
      px-3
      flex items-center justify-center
      rounded-md
      border
      text-sm
      font-medium
      transition
      duration-150
    " :class="{
        'bg-neutral-900 text-white border-neutral-900': link.active,
        'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100': !link.active && link.url,
        'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed': !link.url
    }" />
            </div>
        </div>

        <!-- STORE BY SALESMAN MONTHLY -->
        <!-- <div class="overflow-x-auto mb-6 rounded-lg border border-neutral-200 bg-white shadow-sm">
            <section class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                <h3 class="text-sm font-semibold text-neutral-800">
                    Created Store
                </h3>
                <span class="text-xs text-neutral-500">
                    Monthly
                </span>
            </section>
            <table class="min-w-[1200px] w-full border-collapse text-sm">
                <thead class="bg-neutral-100 border-b border-neutral-300">
                    <tr class="text-left text-neutral-700">
                        <th class="px-4 py-3 font-medium whitespace-nowrap">No</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Store Name</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Store Address</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Created</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(s, i) in (dataStoreBySalesman as any).stores" :key="i"
                        class="border-b border-neutral-200 transition hover:bg-neutral-50">
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ (i as any) += 1 }}
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ s.name }}
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ s.address }}
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ s.created_date }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="p-2">
                <routerLink to="/salesman/monthly-store-recap/pdf" class="inline-flex items-center gap-2
           rounded-md border border-neutral-300
           bg-white px-4 py-2 text-sm
           text-neutral-700
           hover:bg-neutral-100 hover:text-neutral-900
           transition">
                    <FileText class="w-4 h-4" />
                    Export PDF
                </routerLink>
            </div>
        </div> -->

        <!-- {{ dataCustomerBySalesmanMonthly }} -->

        <!-- CUSTOMER BY SALESMAN MONTHLY -->
        <div class="overflow-x-auto mb-6 rounded-lg border border-neutral-200 bg-white shadow-sm">
            <section class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                <h3 class="text-sm font-semibold text-neutral-800">
                    Created Customer
                </h3>
                <span class="text-xs text-neutral-500">
                    Monthly
                </span>
            </section>
            <!-- {{ dataStoreBySalesman?.stores }} -->
            <table class="min-w-[1200px] w-full border-collapse text-sm">
                <thead class="bg-neutral-100 border-b border-neutral-300">
                    <tr class="text-left text-neutral-700">
                        <th class="px-4 py-3 font-medium whitespace-nowrap">No</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Customer Code</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Name</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">NPWP</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Phone</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">Address</th>
                        <th class="px-4 py-3 font-medium whitespace-nowrap">PIC</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(c, i) in dataCustomerBySalesmanMonthly" :key="i"
                        class="border-b border-neutral-200 transition hover:bg-neutral-50">
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ (i as any) += 1 }}
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ c.customer_code }}
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ c.store_name }}
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ c.npwp ? c.npwp : '-' }}
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ c.phone ? c.phone : '-' }}
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ c.address }}
                        </td>
                        <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {{ c.pic ? c.pic : '-' }}
                        </td>

                    </tr>
                </tbody>
            </table>
            <routerLink to="/salesman/monthly-customer-recap/pdf" class="inline-flex items-center gap-2
           rounded-md border border-neutral-300
           bg-white px-4 py-2 text-sm
           text-neutral-700
           hover:bg-neutral-100 hover:text-neutral-900
           transition">
                <FileText />
                Export
            </routerLink>
        </div>

        <div class="overflow-x-auto mb-6 rounded-lg border border-neutral-200 bg-white shadow-sm">
            <section class="flex items-center gap-4 px-4 py-4 bg-neutral-50">

                <!-- Card 1 -->
                <router-link to="/salesman/this-month-recap/customer-and-store/pdf"
                    class="group w-56 p-4 rounded-lg border bg-white hover:shadow-md transition">
                    <div class="flex items-center gap-3">
                        <div class="p-2 rounded bg-sky-100 text-sky-600">
                            <FileText />
                        </div>
                        <div>
                            <p class="text-sm text-neutral-500">Export</p>
                            <h3 class="font-semibold text-neutral-900 group-hover:text-sky-600">
                                Bulan Ini
                            </h3>
                        </div>
                    </div>
                    <p class="mt-2 text-xs text-neutral-500">
                        Rekap customer & store bulan berjalan
                    </p>
                </router-link>

                <!-- Card 2 -->
                <router-link to="/salesman/customer-range-recap/pdf"
                    class="group w-56 p-4 rounded-lg border bg-white hover:shadow-md transition">
                    <div class="flex items-center gap-3">
                        <div class="p-2 rounded bg-violet-100 text-violet-600">
                            <FileText />
                        </div>
                        <div>
                            <p class="text-sm text-neutral-500">Export</p>
                            <h3 class="font-semibold text-neutral-900 group-hover:text-violet-600">
                                Custom Range
                            </h3>
                        </div>
                    </div>
                    <p class="mt-2 text-xs text-neutral-500">
                        Pilih rentang tanggal manual data customer
                    </p>
                </router-link>
            </section>
        </div>

    </SalesmanLayout>
</template>