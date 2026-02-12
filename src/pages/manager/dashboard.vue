<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import { useProduct } from '@/composables/product/useProduct';
import AttendanceEdit from '@/components/alert/AttendanceEdit.vue';
import { Box, CircleDollarSign, NotebookText, Tag, Store, Notebook, Pencil } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useAttendance } from '@/composables/useAttendance';
import AttendanceTypeEdit from '@/components/alert/AttendanceTypeEdit.vue';
import { usePaymentMethod } from '@/composables/usePaymentMethod';
import { api } from '@/lib/http';
import barChart from '@/components/chart/barChart.vue';
import pieChart from '@/components/chart/pieChart.vue';
import EditUom from '@/components/alert/EditUom.vue';
import { useEditBrand } from '@/composables/product/useEditBrand';
import { useUom } from '@/composables/product/useUom';
import EditBrand from '@/components/alert/EditBrand.vue';
import { useEditConfiguration } from '@/composables/product/useEditConfiguration';
import EditConfiguration from '@/components/alert/EditConfiguration.vue';
import { useSalesman } from '@/composables/salesman/useSalesman';
import { formatRupiah } from '@/helper/formatRupiah';
import SalesmanTargetEdit from '@/components/alert/SalesmanTargetEdit.vue';
import PaymentMethodEdit from '@/components/alert/PaymentMethodEdit.vue';

const { getAttendance, groupedByDate, isLoading, getTodayAttendance, attendanceData, selectedDate, attendanceDataByDate, setSelectSalesman, editAttendance, showEditForm, getType, type, selectedType, createAttendance, attendanceVal, loadingCreateAttendance, editedType, idEditType, showFormEditAttendanceType,
    editAttendanceType } = useAttendance()


const { getAll, dataConfiguration, dataUom, dataBrand, isLoadingBrand, isLoadingConfiguration, isLoadingUom, uomNameEdit, confirmEditUom } = useProduct()

const { uomValue, editUom, showEditUom, openEditUom } = useUom()

const { editBrand, showEditBrand, openEditBrand, brand } = useEditBrand()

const { configuration, editConfiguration, openEditConfiguration, showEditConfiguration } = useEditConfiguration()

const { getSalesmanOmset, dataOmsetSalesman, isShowEditDataOmset, setSelectedDataOmset, selectedDataOmset, editDataOmset } = useSalesman()

const { createPaymentMethod, paymentMethod, valPayment, isLoadingCreatePaymentMethod, getPaymentMethod, showPaymentMethodEdit, paymentMethodEdit, selectedId, valueEditPayment } = usePaymentMethod()

onMounted(async () => {
    await getAll()
    await getSalesmanOmset()
    await getPaymentMethod()
})

const cardInfo = computed(() => [
    { icon: Store, label: 'Jumlah Toko' },
    { icon: Tag, label: 'Total UOM' },
    { icon: NotebookText, label: '' },
    { icon: CircleDollarSign, label: '' }
])

onMounted(() => {
    getTodayAttendance()
})

getType()


const bottleneck = () => {
    for (let i = 0; i < 100; i++) {
        api.get('/me')
    }
}

const refresh = async () => {
    await api.post('/refresh')
}

const hanldeUomUpdate = (val: string) => {
    uomValue.value = val
}

const handleBrandUpdate = (val: string) => {
    brand.value.name = val
}

const handleConfigurationUpdate = (val: string) => {
    configuration.value.configuration = val
}

const updateUom = async () => {
    await editUom()
    await getAll()
}

const updateBrand = async () => {
    await editBrand()
    await getAll()
}

const updateConfiguration = async () => {
    await editConfiguration()
    await getAll()
}

const cancelSelectDataOmset = () => {
    isShowEditDataOmset.value = false
    selectedDataOmset.value = []
}

const confirmEditDataOmset = async () => {
    await getSalesmanOmset()
    await editDataOmset()
}

const attendanceCreate = async () => {
    await createAttendance()
    await getType()
}

const selectAttendanceType = (id: number) => {
    idEditType.value = id
    showFormEditAttendanceType.value = true
}

const confirmEditAttendance = async () => {
    await editAttendanceType()
    await getType()
}

const createPayment = async () => {
    await createPaymentMethod()
    await getPaymentMethod()
}

const selectIdEditPayment = (id: number) => {
    selectedId.value = id
    showPaymentMethodEdit.value = true
}

const confirmEditPaymentMethod = async () => {
    await paymentMethodEdit()
    await getPaymentMethod()
}


</script>
<template>

    <SalesmanTargetEdit :dataOmset="selectedDataOmset" v-if="isShowEditDataOmset" @cancel="cancelSelectDataOmset"
        @confirm="editDataOmset" />
    <EditUom v-if="showEditUom" @cancel="showEditUom = false" @confirm="updateUom" @update="hanldeUomUpdate" />
    <EditBrand v-if="showEditBrand" @cancel="showEditBrand = false" @confirm="updateBrand"
        @update="handleBrandUpdate" />
    <EditConfiguration v-if="showEditConfiguration" @cancel="showEditConfiguration = false"
        @confirm="updateConfiguration" @update="handleConfigurationUpdate" />
    <AttendanceTypeEdit v-if="showFormEditAttendanceType" v-model="editedType" @confirm="confirmEditAttendance"
        @cancel="showFormEditAttendanceType = false" />
    <PaymentMethodEdit @cancel="showPaymentMethodEdit = false" v-if="showPaymentMethodEdit" v-model="valueEditPayment"
        @confirm="confirmEditPaymentMethod" />
    <Main>

        <AttendanceEdit v-if="showEditForm" @cancel="showEditForm = false" @confirm="editAttendance" :type="type"
            v-model:selectedType="selectedType" />

        <section class="space-y-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <section class="lg:col-span-2">
                    <barChart />
                </section>
                <section class="lg:col-span-1">
                    <pieChart />
                </section>
            </div>

            <div class="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
                <section class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                    <h3 class="text-sm font-semibold text-neutral-800">
                        Salesman Target
                    </h3>
                    <span class="text-xs text-neutral-500">Monthly</span>
                </section>
                <table class="min-w-[1200px] w-full border-collapse text-sm">
                    <thead class="bg-neutral-100 border-b border-neutral-300">
                        <tr class="text-left text-neutral-700">
                            <th class="px-4 py-3 font-medium whitespace-nowrap">No</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Salesman Code</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Salesman Name</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Target Value</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Target Harian</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Terealisasi</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Peresentase</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Hari Kerja</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(d, i) in dataOmsetSalesman" :key="i"
                            class="border-b border-neutral-200 hover:bg-neutral-50 transition">
                            <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                                {{ i + 1 }}
                            </td>
                            <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                                {{ d.salesman_code }}
                            </td>
                            <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                                {{ d.salesman }}
                            </td>
                            <td v-if="d.target == 0" class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                                Target belum ditentukan
                            </td>
                            <td v-else class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                                {{ formatRupiah(d.target) }}
                            </td>
                            <td v-if="d.target_harian == 0" class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                                Target belum ditentukan
                            </td>
                            <td v-else class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                                {{ formatRupiah(d.target_harian) }}
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
                            <td class="px-4 py-3 text-white whitespace-nowrap">
                                <button @click="setSelectedDataOmset(d.salesman_id)"
                                    class="bg-sky-500 hover:bg-sky-600 rounded p-1 transition">
                                    <Pencil :size="20" />
                                </button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <div>
                <div class="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
                    <section
                        class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                        <h3 class="text-sm font-semibold text-neutral-800">
                            Today Attendance
                        </h3>
                        <span class="text-xs text-neutral-500">
                            {{ attendanceData.length }} person
                        </span>
                    </section>

                    <table class="min-w-[1200px] w-full border-collapse text-sm">
                        <thead class="bg-neutral-100 border-b border-neutral-300">
                            <tr class="text-left text-neutral-700">
                                <th class="px-4 py-3 font-medium whitespace-nowrap">No</th>
                                <th class="px-4 py-3 font-medium whitespace-nowrap">Nama</th>
                                <th class="px-4 py-3 font-medium whitespace-nowrap">Code</th>
                                <th class="px-4 py-3 font-medium whitespace-nowrap">Kehadiran</th>
                                <th class="px-4 py-3 font-medium whitespace-nowrap">Jam Absen</th>
                                <th class="px-4 py-3 font-medium whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="attendanceData.length > 0 && !isLoading">
                            <tr v-for="(a, i) in attendanceData" :key="i"
                                class="border-b border-neutral-200 hover:bg-neutral-50 transition">
                                <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                                    {{ i + 1 }}
                                </td>
                                <td class="px-4 py-3 font-medium text-neutral-800 whitespace-nowrap">
                                    {{ a.salesman.name }}
                                </td>
                                <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                                    {{ a.salesman.code }}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap">
                                    <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
                                        :class="a.type.type === 'hadir'
                                            ? 'bg-green-100 text-green-700'
                                            : a.type.type === 'izin'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : a.type.type === 'sakit' ? 'bg-sky-100 text-sky-700' : 'bg-red-100 text-red-700'
                                            ">
                                        {{ a.type.type }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-xs text-neutral-600 whitespace-nowrap">
                                    {{ a.check_in_at }}
                                </td>
                                <td class="px-4 py-3 text-xs text-white whitespace-nowrap">
                                    <button @click="setSelectSalesman(a.salesman.id)"
                                        class="bg-sky-500 hover:bg-sky-600 rounded p-1 transition">
                                        <Pencil :size="20" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else-if="!isLoading">
                            <tr>
                                <td colspan="6" class="px-4 py-8 text-center text-slate-700">
                                    No attendance yet
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if="isLoading">
                            <tr>
                                <td colspan="6" class="px-4 py-8 text-center text-slate-700">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="px-4 py-3 bg-white shadow-sm bg-white border-neutral-200">
                    <section class="mb-4">Create Attendance</section>
                    <div class="flex justify-between">
                        <input v-model="attendanceVal" type="text" class="input" placeholder="Create new attendance">
                        <button @click="attendanceCreate" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer ml-4">{{
                                    loadingCreateAttendance ? 'Loading' : 'Create' }}</button>
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
                <section class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                    <h3 class="text-sm font-semibold text-neutral-800">
                        Attendance type
                    </h3>
                </section>
                <section v-if="!loadingCreateAttendance">
                    <div v-for="(t, i) in type" :key="i"
                        class="flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50 transition">
                        <stan class="text-slate-700">{{ t.type }}</stan>
                        <button
                            v-if="t.type !== 'hadir' && t.type !== 'izin' && t.type !== 'sakit' && t.type !== 'telat'"
                            @click="selectAttendanceType(t.id)"
                            class="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition">
                            <Pencil class="w-4 h-4" />
                        </button>
                    </div>
                </section>
                <section v-else class="p-2">
                    Loading...
                </section>
            </div>
            <div class="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
                <section class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                    <h3 class="text-sm font-semibold text-neutral-800">
                        Attendance By Date
                    </h3>
                    <span class="inline-flex items-center gap-2 text-xs text-neutral-600">
                        <input v-model="selectedDate" type="date" class="
      h-8
      rounded-md
      border border-neutral-300
      bg-white
      px-2
      text-sm text-neutral-700
      shadow-sm
      focus:border-blue-500
      focus:outline-none
      focus:ring-1
      focus:ring-blue-500
      hover:border-neutral-400
    " />
                    </span>
                </section>

                <table class="min-w-[1200px] w-full border-collapse text-sm">
                    <thead class="bg-neutral-100 border-b border-neutral-300">
                        <tr class="text-left text-neutral-700">
                            <th class="px-4 py-3 font-medium whitespace-nowrap">No</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Nama</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Code</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Kehadiran</th>
                            <th class="px-4 py-3 font-medium whitespace-nowrap">Jam Absen</th>
                        </tr>
                    </thead>
                    <tbody v-if="attendanceDataByDate.length > 0">
                        <tr v-for="(a, i) in attendanceDataByDate" :key="i"
                            class="border-b border-neutral-200 hover:bg-neutral-50 transition">
                            <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                                {{ i + 1 }}
                            </td>
                            <td class="px-4 py-3 font-medium text-neutral-800 whitespace-nowrap">
                                {{ a.salesman.name }}
                            </td>
                            <td class="px-4 py-3 text-neutral-600 whitespace-nowrap">
                                {{ a.salesman.code }}
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
                                    :class="a.type.type === 'hadir'
                                        ? 'bg-green-100 text-green-700'
                                        : a.type.type === 'izin'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : a.type.type === 'sakit' ? 'bg-sky-100 text-sky-700' : 'bg-red-100 text-red-700'
                                        ">
                                    {{ a.type.type }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-xs text-neutral-600 whitespace-nowrap">
                                {{ a.check_in_at }}
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="5" class="px-4 py-8 text-center text-slate-700">
                                No attendance yet
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="rounded bg-white p-4 shadow-sm">
                <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div class="h-96 overflow-y-auto rounded-lg border border-neutral-200 bg-white">
                        <header
                            class="sticky top-0 z-10 bg-white px-3 py-2 border-b border-neutral-200 font-semibold text-sm text-slate-700">
                            UOM
                        </header>
                        <div class="divide-y divide-neutral-200">
                            <template v-if="!isLoadingUom">
                                <div v-for="(u, i) in dataUom" :key="i"
                                    class="flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50 transition">
                                    <span class="text-slate-700">{{ u.name }}</span>
                                    <button @click="openEditUom(u.id)"
                                        class="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition">
                                        <Pencil class="w-4 h-4" />
                                    </button>
                                </div>
                            </template>
                            <div v-if="isLoadingUom" class="flex items-center justify-center px-3 py-2 text-sm">
                                Loading...
                            </div>
                        </div>
                    </div>

                    <div class="h-96 overflow-y-auto rounded-lg border border-neutral-200 bg-white">
                        <header
                            class="sticky top-0 z-10 bg-white px-3 py-2 border-b border-neutral-200 font-semibold text-sm text-slate-700">
                            Brand
                        </header>
                        <div class="divide-y divide-neutral-200">
                            <template v-if="!isLoadingBrand">
                                <div v-for="(b, i) in dataBrand" :key="i"
                                    class="flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50 transition">
                                    <span class="text-slate-700">{{ b.name }}</span>
                                    <button @click="openEditBrand(b.id)"
                                        class="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition">
                                        <Pencil class="w-4 h-4" />
                                    </button>
                                </div>
                            </template>
                            <div v-if="isLoadingBrand" class="flex items-center justify-center px-3 py-2 text-sm">
                                Loading...
                            </div>
                        </div>
                    </div>

                    <div class="h-96 overflow-y-auto rounded-lg border border-neutral-200 bg-white">
                        <header
                            class="sticky top-0 z-10 bg-white px-3 py-2 border-b border-neutral-200 font-semibold text-sm text-slate-700">
                            Configuration
                        </header>
                        <div class="divide-y divide-neutral-200">
                            <template v-if="!isLoadingConfiguration">
                                <div v-for="(c, i) in dataConfiguration" :key="i"
                                    class="flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50 transition">
                                    <span class="text-slate-700">{{ c.configuration }}</span>
                                    <button @click="openEditConfiguration(c.id)"
                                        class="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition">
                                        <Pencil class="w-4 h-4" />
                                    </button>
                                </div>
                            </template>
                            <div v-if="isLoadingConfiguration"
                                class="flex items-center justify-center px-3 py-2 text-sm">
                                Loading...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
                <section class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                    <h3 class="text-sm font-semibold text-neutral-800">
                        Payment Method
                    </h3>
                </section>
                <section v-if="!loadingCreateAttendance">
                    <div v-for="(p, i) in paymentMethod" :key="i"
                        class="flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50 transition">
                        <stan class="text-slate-700">{{ p.name }}</stan>
                        <button @click="selectIdEditPayment(p.id)"
                            class="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition">
                            <Pencil class="w-4 h-4" />
                        </button>
                    </div>
                    <div class="px-4 py-3 bg-white shadow-sm bg-white border-t border-neutral-200">
                        <section class="mb-4">Create Payment Method</section>
                        <div class="flex justify-between">
                            <input v-model="valPayment" type="text" class="input"
                                placeholder="Create new payment method">
                            <button @click="createPayment" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer ml-4">{{
                                    isLoadingCreatePaymentMethod ? 'Loading' : 'Create' }}</button>
                        </div>
                    </div>
                </section>
                <section v-else>
                    Loading...
                </section>
            </div>
        </section>
    </Main>
</template>