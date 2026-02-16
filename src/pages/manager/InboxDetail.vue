<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import { useRoute } from 'vue-router';
import Discount1Edit from '@/components/alert/Discount1Edit.vue';
import Discount2Edit from '@/components/alert/Discount2Edit.vue';
import ChooseDiscont from '@/components/alert/ChooseDiscont.vue';
import { ref, onMounted, computed, nextTick } from 'vue';
import { Pencil, FileText } from 'lucide-vue-next';
import { useInbox } from '@/composables/useInbox';
import { useRequest } from '@/composables/useRequest';
import { formatRupiah } from '@/helper/formatRupiah';
import { usePdf } from '@/composables/pdf/usePdf';



const route = useRoute()

// Composables
const { getDetail, detailInbox, rejectUpdate, approvedUpdate } = useInbox()
const {
    showEditDiscount2Form, editDiscount2, setShowDiscount2, discount2,
    showEditDiscount1Form, editDiscount1, setShowDiscount1, discount1,
    query, isLoadingEdit
} = useRequest()
const { exportPdf } = usePdf()
const pdfRef = ref<HTMLElement | null>(null)

async function handleExport() {
    if (!pdfRef.value) {
        alert('Gagal export: area PDF tidak ditemukan')
        return
    }

    try {
        isPdf.value = true
        await nextTick() // ⬅️ tunggu DOM update (hide kolom Actions)

        await exportPdf(
            pdfRef.value,
            `nota-${detailInbox.value?.uuid ?? 'unknown'}.pdf`
        )

        alert('PDF berhasil diunduh')
    } catch (error) {
        console.error(error)
        alert('Gagal mengunduh PDF')
    } finally {
        isPdf.value = false
    }
}


query.value = route.query.id

onMounted(async () => {
    await getDetail(route.query.id)
})

// Format tanggal
function formatTanggal(date: any) {
    return new Date(date).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

// Update discount dari child
function handleUpdate(value: any) { discount2.value = value }
function handleUpdate1(value: any) { discount1.value = value }

// ------------------- Pilih Discount -------------------
const isShowChooseDiscount = ref(false)
const currentDiscount1Id = ref<number | null>(null)
const currentDiscount2Id = ref<number | null>(null)

function setChooseDiscount(discount1Id: number, discount2Id: number) {
    currentDiscount1Id.value = discount1Id
    currentDiscount2Id.value = discount2Id
    isShowChooseDiscount.value = true
}

// Tombol pilih discount
function choose1() {
    if (currentDiscount1Id.value !== null) {
        setShowDiscount1(currentDiscount1Id.value)
    }
    closeChooseDiscount()
}

function choose2() {
    if (currentDiscount2Id.value !== null) {
        setShowDiscount2(currentDiscount2Id.value)
    }
    closeChooseDiscount()
}

function closeChooseDiscount() {
    isShowChooseDiscount.value = false
    currentDiscount1Id.value = null
    currentDiscount2Id.value = null
}

// ------------------- Confirm Edit -------------------
async function confirmEditDiscount2() {
    await editDiscount2()
    await getDetail(route.query.id)
}

async function confirmEditDiscount1() {
    await editDiscount1()
    await getDetail(route.query.id)
}

const total = computed(() => {
    return detailInbox.value?.request_items?.reduce(
        (sum: number, item: any) => {
            const base = item.qty * item.product.karton
            const afterDiscount1 = base * (1 - item.product.discount1 / 100)
            const afterDiscount2 = afterDiscount1 * (1 - item.discount2 / 100)
            return sum + afterDiscount2
        },
        0
    ) ?? 0
})

const isPdf = ref(false)

</script>

<template>
    <!-- Modals -->
    <Discount2Edit v-if="showEditDiscount2Form" @cancel="showEditDiscount2Form = false" @confirm="confirmEditDiscount2"
        @update="handleUpdate" :is-loading-edit="isLoadingEdit" />

    <Discount1Edit v-if="showEditDiscount1Form" @cancel="showEditDiscount1Form = false" @confirm="confirmEditDiscount1"
        @update="handleUpdate1" :is-loading-edit="isLoadingEdit" />

    <ChooseDiscont v-if="isShowChooseDiscount" @discount2="choose2" @discount1="choose1"
        @cancel="closeChooseDiscount" />

    <!-- Main content -->
    <Main>
        <section class="bg-white rounded-md shadow-md p-2 text-slate-700 mb-4">Manage Product</section>

        <div class="p-4 rounded bg-white">
            <div v-if="detailInbox" class="pdf-area">
                <div class="pdf-page" ref="pdfRef">
                    <!-- HEADER -->
                    <div class="pdf-header">
                        <div>
                            <h1>NOTA PENJUALAN</h1>
                            <div>Status: {{
                                (detailInbox.status1 !== 'pending' && detailInbox.status1 !== 'pending' ?
                                    detailInbox.status1 : 'pending')
                            }}</div>
                            <div>Tanggal: {{ formatTanggal(detailInbox.created_at) }}</div>
                            <div>Metode: {{ detailInbox.payment_method.name }}</div>
                            <div>Invoice No : INV-{{ detailInbox.created_at }}</div>
                        </div>
                        <div class="right">
                            <div>Salesman: {{ detailInbox.salesman.name }}</div>
                            <div>Kode: {{ detailInbox.salesman.code }}</div>
                        </div>
                    </div>

                    <!-- INFO TOKO -->
                    <div class="pdf-info">
                        <div><b>Toko:</b> {{ detailInbox.customer.store_name }}</div>
                        <div><b>Alamat:</b> {{ detailInbox.customer.address }}</div>
                        <div><b>Customer Code:</b> {{ detailInbox.customer.customer_code }}</div>
                        <div>
                            <b>Approval Manager:</b>
                            {{ detailInbox.manager?.name ?? '-' }}
                            ({{ detailInbox.status1 ?? 'status' }})
                        </div>
                        <div>
                            <b>Approval Supervisor:</b>
                            {{ detailInbox.supervisor?.name ?? '-' }} ({{ detailInbox.status2 ?? 'status' }})
                        </div>
                    </div>

                    <!-- TABLE -->
                    <table class="pdf-table">
                        <thead>
                            <tr>
                                <th>Produk</th>
                                <th>Qty</th>
                                <th>Konfig</th>
                                <th>Harga UOM</th>
                                <th>Karton</th>
                                <th>D1</th>
                                <th>D2</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in detailInbox.request_items" :key="item.id">
                                <td>
                                    {{ item.product.name }}
                                </td>
                                <td class="right">{{ item.qty }}</td>
                                <td>{{ item.product.configuration.configuration }}</td>
                                <td class="right">{{ formatRupiah(item.product.satuan_uom) }}</td>
                                <td class="right">{{ formatRupiah(item.product.karton) }}</td>
                                <td class="right">{{ item.product.discount1 }}%</td>
                                <td class="right">{{ item.discount2 }}%</td>
                                <td class="right">
                                    {{ formatRupiah(
                                        (item.qty * item.product.karton)
                                        * (1 - item.product.discount1 / 100)
                                        * (1 - item.discount2 / 100)
                                    ) }}
                                </td>
                            </tr>
                            <!-- TOTAL -->
                            <tr class="pdf-total-row">
                                <td colspan="7" class="left"><b>Total</b></td>
                                <td class="right"><b>{{ formatRupiah(total) }}</b></td>
                            </tr>
                            <tr class="pdf-total-row">
                                <td colspan="2">
                                    <label class="block text-xs mb-1">
                                        NOTE (opsional)
                                    </label>
                                </td>
                                <td colspan="6">
                                    {{ detailInbox.message ?? '-' }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        <section class="bg-white rounded-md p-4 mt-4 shadow-sm">
            <div class="flex items-center justify-between">
                <div class="text-sm text-slate-600">
                    Tindakan
                </div>
                <div class="flex gap-2">
                    <button class="text-neutral-900 bg-sky-300 flex p-2 rounded cursor-pointer" @click="handleExport">
                        <FileText />
                        Export
                    </button>
                    <button @click="rejectUpdate"
                        class="cursor-pointer px-4 py-2 rounded-md text-sm font-medium border border-red-500 text-red-600 hover:bg-red-50 transition">
                        Reject
                    </button>
                    <button @click="approvedUpdate"
                        class="cursor-pointer px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition shadow">
                        Approve
                    </button>
                </div>
            </div>
        </section>
    </Main>
</template>
