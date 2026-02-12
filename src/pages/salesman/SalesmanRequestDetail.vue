<script setup lang="ts">
// import Main from '@/layouts/Main.vue';
import { ref, nextTick, computed } from 'vue';
import SalesmanLayout from '@/layouts/SalesmanLayout.vue';
import { usePdf } from '@/composables/pdf/usePdf';
import { FileText } from 'lucide-vue-next';

import { formatRupiah } from '@/helper/formatRupiah';
import { useRoute } from 'vue-router';
const route = useRoute()
import { useInbox } from '@/composables/useInbox';
import { onMounted } from 'vue';
import InboxDetail from '../manager/InboxDetail.vue';
const { getDetail, detailInbox, rejectUpdate, approvedUpdate } = useInbox()
const { exportPdf } = usePdf()
const pdfRef = ref<HTMLElement | null>(null)
const isPdf = ref(false)
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
            `nota-${detailInbox.value?.id ?? 'unknown'}.pdf`
        )

        alert('PDF berhasil diunduh')
    } catch (error) {
        console.error(error)
        alert('Gagal mengunduh PDF')
    } finally {
        isPdf.value = false
    }
}

const total = computed(() => {
    return detailInbox.value?.request_items?.reduce(
        (sum: number, item: any) => {
            const base = item.qty * item.product.karton
            const afterD1 = base * (1 - item.product.discount1 / 100)
            const afterD2 = afterD1 * (1 - item.discount2 / 100)
            return sum + afterD2
        },
        0
    ) ?? 0
})

onMounted(async () => {
    await getDetail(route.query.id)
})
function formatTanggal(date: string) {
    return new Date(date + 'Z').toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

</script>
<template>
    <SalesmanLayout>
        <section class="bg-white rounded-md shadow-md p-2 text-slate-700">Manage Product</section>
        <section class="bg-white rounded-md p-4 text-slate-700 mt-4">
            <div class="p-4 rounded bg-white">
                <div v-if="detailInbox" class="pdf-area">
                    <div class="pdf-page" ref="pdfRef">
                        <!-- HEADER -->
                        <div class="pdf-header">
                            <div>
                                <h1>NOTA PENJUALAN</h1>
                                <div>Status: {{ detailInbox.status }}</div>
                                <div>Tanggal: {{ formatTanggal(detailInbox.created_at) }}</div>
                                <div>Metode: {{ detailInbox.payment_method.name }}</div>
                                <div>Invoice No : INV-{{ detailInbox.uuid }}</div>
                            </div>
                            <div class="right">
                                <div>Salesman: {{ detailInbox.salesman.name }}</div>
                                <div>Kode: {{ detailInbox.salesman.code }}</div>
                            </div>
                        </div>

                        <!-- INFO TOKO -->
                        <div class="pdf-info">
                            <div><b>Toko:</b> {{ detailInbox.store.name }}</div>
                            <div><b>Alamat:</b> {{ detailInbox.store.address }}</div>
                            <div>
                                <b>Approval Manager:</b>
                                {{ detailInbox.manager?.name ?? '-' }}({{ detailInbox.status1 ?? '-' }})
                            </div>
                            <div><b>Approval Supervisor:</b> {{ detailInbox.manager?.name ?? '-' }} ({{
                                detailInbox.status2 ?? '-' }})</div>
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
                                        <div class="muted">
                                            {{ item.product.brand.name }} • {{ item.product.configuration.configuration
                                            }}
                                        </div>
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
        </section>

        <section class="bg-white rounded-md p-4 mt-4 shadow-sm">
            <div class="flex items-center justify-between">
                <div class="text-sm text-slate-600">
                    Tindakan
                </div>

                <div class="flex gap-2" v-if="detailInbox">
                    <button v-if="detailInbox.status1 === 'approved' && detailInbox.status2 === 'approved'"
                        class="text-neutral-900 bg-sky-300 flex p-2 rounded cursor-pointer" @click="handleExport">
                        <FileText />
                        Export
                    </button>
                    <button v-else class="text-neutral-700 bg-neutral-300 flex p-2 rounded cursor-not-allowed">
                        <FileText />
                        Export
                    </button>
                </div>
            </div>
        </section>
    </SalesmanLayout>
</template>