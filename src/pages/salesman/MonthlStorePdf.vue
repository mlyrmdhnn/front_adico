<script setup lang="ts">
import SalesmanLayout from '@/layouts/SalesmanLayout.vue';
import { usePdf } from '@/composables/pdf/usePdf';
import { ref, nextTick, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useStore } from '@/composables/useStore';
import { FileText } from 'lucide-vue-next';
const { user } = useAuthStore()
const { storeBySalesman, dataStoreBySalesman, isLoading } = useStore()

onMounted(async () => {
    await storeBySalesman()
})

const { exportPdf } = usePdf()
const pdfRef = ref<HTMLElement | null>(null)
const isPdf = ref(false)

const date = new Date()

const year = date.getFullYear()
const month = String(date.getMonth() + 1).padStart(2, '0')
const day = String(date.getDate()).padStart(2, '0')


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


const totalStore = computed(() => {
    return (dataStoreBySalesman as any).value?.stores?.length ?? 0
})



</script>
<template>
    <SalesmanLayout>
        <!-- {{ dataStoreBySalesman.stores }} -->
        <div class="p-4 rounded bg-white">
            <div class="pdf-area">
                <div class="pdf-page" ref="pdfRef">
                    <!-- HEADER -->
                    <div class="mb-5">
                        <h1 class="">Salesman = {{ (user as any)?.name }}</h1>
                        <h1>Title = {{ `Monthly recap Store ${user?.role} ${year}-${month}-${day}` }}</h1>
                    </div>
                    <div class="pdf-header">
                        <div>

                        </div>


                        <!-- TABLE -->
                        <table class="pdf-table">
                            <thead>
                                <tr>
                                    <th colspan="1">No</th>
                                    <th colspan="3">Store Name</th>
                                    <th colspan="4">Store Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(s, i) in (dataStoreBySalesman as any)?.stores" :key="i">
                                    <td>
                                        {{ (i as any) + 1 }}
                                    </td>
                                    <td colspan="3" class="right">{{ s.name }}</td>
                                    <td colspan="4" class="right">{{ s.address }}</td>
                                </tr>
                                <tr class="pdf-total-row">
                                    <td colspan="1">
                                        <label class="block text-xs mb-1">
                                            Total toko
                                        </label>
                                    </td>
                                    <td class="right" colspan="7">
                                        {{ totalStore }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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