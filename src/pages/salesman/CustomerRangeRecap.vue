<script setup lang="ts">
import SalesmanLayout from '@/layouts/SalesmanLayout.vue'
import { usePdf } from '@/composables/pdf/usePdf'
import { ref, nextTick, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { FileText } from 'lucide-vue-next'
import { useCustomer } from '@/composables/customer/useCustomer'
import SalesmanButtonNav from '@/components/SalesmanButtonNav.vue'

const { user } = useAuthStore()

const {
    dataCustomerBySalesmanMonthly,
    getCustomerRangeRecap,
    startDate,
    endDate,
} = useCustomer()

const { exportPdf } = usePdf()
const pdfRef = ref<HTMLElement | null>(null)
const isPdf = ref(false)

const date = new Date()
const year = date.getFullYear()
const month = String(date.getMonth() + 1).padStart(2, '0')
const day = String(date.getDate()).padStart(2, '0')

const handleSearch = async () => {
    if (!startDate.value || !endDate.value) {
        alert('Silakan pilih start dan end date')
        return
    }

    await getCustomerRangeRecap()
}

async function handleExport() {
    if (!pdfRef.value) {
        alert('Gagal export: area PDF tidak ditemukan')
        return
    }

    try {
        isPdf.value = true
        await nextTick()

        await exportPdf(
            pdfRef.value,
            `Monthly recap ${user?.role}`
        )

        alert('PDF berhasil diunduh')
    } catch (error) {
        console.error(error)
        alert('Gagal mengunduh PDF')
    } finally {
        isPdf.value = false
    }
}

const totalCustomer = computed(() => {
    return dataCustomerBySalesmanMonthly.value?.length ?? 0
})
</script>

<template>
    <SalesmanLayout>
        <SalesmanButtonNav class="mb-4" />
        <div class="p-4 rounded bg-white">

            <!-- FILTER (SAMA PERSIS) -->
            <div class="mb-6">
                <div class="flex items-center justify-between">
                    <div class="flex">
                        <label>
                            <span class="text-xs">Start Date</span>
                            <input type="date" v-model="startDate" class="input">
                        </label>
                        <label>
                            <span class="text-xs">End Date</span>
                            <input type="date" v-model="endDate" class="input">
                        </label>
                    </div>
                    <div>
                        <button @click="handleSearch" class="px-5 py-1 rounded-lg text-sm text-white
                     bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                            Search Data
                        </button>
                    </div>
                </div>
            </div>

            <!-- PDF AREA -->
            <div class="pdf-area" v-if="dataCustomerBySalesmanMonthly?.length">
                <div class="pdf-page" ref="pdfRef">

                    <!-- HEADER -->
                    <div class="mb-5">
                        <h1>Salesman = {{ (user as any)?.name }}</h1>
                        <h1>
                            Title = {{ `Monthly recap Customer ${user?.role} ${year}-${month}-${day}` }}
                        </h1>
                    </div>

                    <!-- TABLE -->
                    <table class="pdf-table">
                        <thead>
                            <tr>
                                <th colspan="1">No</th>
                                <th colspan="3">Customer Code</th>
                                <th colspan="3">Name</th>
                                <th colspan="4">NPWP</th>
                                <th colspan="4">Phone</th>
                                <th colspan="4">Address</th>
                                <th colspan="4">PIC</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(c, i) in dataCustomerBySalesmanMonthly" :key="i">
                                <td>{{ i + 1 }}</td>
                                <td colspan="3" class="right">{{ c.customer_code }}</td>
                                <td colspan="3" class="right">{{ c.store_name }}</td>
                                <td colspan="4" class="right">{{ c.npwp ? c.npwp : '-' }}</td>
                                <td colspan="4" class="right">{{ c.phone ? c.phone : '-' }}</td>
                                <td colspan="4" class="right">{{ c.address }}</td>
                                <td colspan="4" class="right">{{ c.pic ? c.pic : '-' }}</td>
                            </tr>

                            <tr class="pdf-total-row">
                                <td colspan="4">
                                    <label class="block text-xs mb-1">
                                        Total Customer
                                    </label>
                                </td>
                                <td class="right" colspan="19">
                                    {{ totalCustomer }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- EMPTY STATE (SAMA) -->
            <div v-else class="p-2 text-neutral-500">
                Mohon maaf data tidak tersedia
            </div>

            <!-- EXPORT (SAMA) -->
            <button @click="handleExport" class="inline-flex items-center gap-2
           rounded-md border border-neutral-300
           bg-white px-4 py-2 text-sm
           text-neutral-700
           hover:bg-neutral-100 hover:text-neutral-900
           transition">
                <FileText />
                Export
            </button>

        </div>
    </SalesmanLayout>
</template>