<script setup lang="ts">
import SalesmanLayout from '@/layouts/SalesmanLayout.vue'
import { ref, onMounted } from 'vue'
import Multiselect from 'vue-multiselect'
import { useRequest } from '@/composables/useRequest'
import { useToast } from '@/composables/useToast'
const { show } = useToast()

const {
    dataStore,
    selectedStore,
    getStore,
    dataProduct,
    getProduct,
    createRequest,
    paymentMethod,
    getPaymentMethod,
    selectedPaymentMethod,
    note,
    isDisabled

} = useRequest()

onMounted(async () => {
    await getStore()
    await getProduct()
    await getPaymentMethod()
})

const storeLabel = (store: any) =>
    `${store.name} - ${store.address} | ${store.customer.name}`

const productLabel = (product: any) =>
    `${product.name} | ${product.brand?.name} | ${product.uom?.name} | ${product.discount1} `

const items = ref<any[]>([
    {
        product: null,
        qty: 1,
        discount2: 0.00
    }
])

const addRow = () => {
    items.value.push({
        product: null,
        qty: 1,
        discount2: 0.00
    })
}

const removeRow = (index: number) => {
    if (items.value.length === 1) return
    items.value.splice(index, 1)
}

const submit = async () => {
    if (!selectedStore.value) return

    const payload = {
        store_id: selectedStore.value.id,
        payment_method_id: selectedPaymentMethod.value.id,
        note: note.value,
        items: items.value.map(item => ({
            product_id: item.product.id,
            qty: item.qty,
            discount2: item.discount2
        }))
    }

    if (!selectedStore.value || !selectedPaymentMethod.value || !payload.items) {
        show('Please check required field', 'info')
        return
    }

    await createRequest(payload)
}
</script>

<template>
    <SalesmanLayout>
        <!-- HEADER -->
        <section class="bg-white rounded-md p-4 text-slate-700">
            <h1 class="text-lg font-semibold">
                Buat Request / Nota
            </h1>
            <p class="text-sm text-slate-500 mt-0.5">
                Pilih toko lalu tambahkan produk
            </p>
        </section>

        <!-- FORM -->
        <section class="mt-4 bg-white rounded-md p-4">
            <form @submit.prevent="" class="space-y-8">

                <!-- STORE -->
                <div>
                    <label class="block text-xs font-medium text-slate-500 mb-2">
                        STORE
                    </label>
                    <Multiselect v-model="selectedStore" :options="dataStore" track-by="id" :custom-label="storeLabel"
                        placeholder="Cari store..." searchable />
                </div>

                <div>
                    <label class="block text-xs font-medium text-slate-500 mb-2">
                        PAYMENT METHOD
                    </label>
                    <Multiselect v-model="selectedPaymentMethod" :options="paymentMethod" track-by="id" label="name"
                        placeholder="Select payment method" searchable />
                </div>
                <!-- ITEMS -->
                <div class="space-y-4">
                    <div v-for="(item, index) in items" :key="index" class=" rounded-md p-3 sm:p-4">
                        <div class="grid grid-cols-1 md:grid-cols-[1fr_90px_110px_32px] gap-3 items-end">
                            <!-- PRODUCT -->
                            <div>
                                <label class="block text-xs text-slate-500 mb-1 md:hidden">
                                    Produk
                                </label>
                                <Multiselect v-model="item.product" :options="dataProduct" track-by="id"
                                    :custom-label="productLabel" placeholder="Pilih produk" searchable />
                            </div>

                            <!-- QTY -->
                            <div>
                                <label class="block text-xs text-slate-500 mb-1">
                                    Qty
                                </label>
                                <input v-model="item.qty" type="number" min="1" class="w-full px-3 py-2 text-sm rounded-md
                 bg-slate-100 focus:bg-white
                 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                            </div>

                            <!-- DISCOUNT -->
                            <div>
                                <label class="block text-xs text-slate-500 mb-1">
                                    Disc2 %
                                </label>
                                <input v-model="item.discount2" type="number" min="0" max="100" class="w-full px-3 py-2 text-sm rounded-md
                 bg-slate-100 focus:bg-white
                 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                            </div>

                            <!-- DELETE -->
                            <div class="flex justify-end md:justify-center">
                                <button type="button" class="text-slate-400 hover:text-red-600 transition text-sm"
                                    @click="removeRow(index)" title="Hapus item">
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="text-sm text-slate-600 hover:text-slate-900" @click="addRow">
                        + Tambah item
                    </button>
                </div>

                <div>
                    <label class="block text-xs text-slate-500 mb-1">
                        NOTE (opsional)
                    </label>
                    <textarea v-model="note" name="" id="" class="input"
                        placeholder="e.g Customer meminta dikirim barang hari sabtu"></textarea>
                </div>

                <!-- ACTION -->
                <div class="flex justify-end pt-2">
                    <button :disabled="isDisabled" @click="submit" type="submit" class="px-6 py-2 rounded-md text-sm font-medium text-white
                               bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer"
                        :class="[isDisabled ? 'bg-black' : '']">
                        {{ isDisabled ? 'Send Request' : 'Simpan Nota' }}
                    </button>
                </div>

            </form>
        </section>
    </SalesmanLayout>
</template>
