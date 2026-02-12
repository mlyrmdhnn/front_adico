<script setup lang="ts">
import Card from '@/components/manageProduct/Card.vue';
import Main from '@/layouts/Main.vue';
import { useProduct } from '@/composables/product/useProduct';
import { onMounted } from 'vue';
import Multiselect, { multiselectMixin } from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css'
const { getAll, dataBrand, dataUom, dataConfiguration, form, createProduct, isLoadingCreateProduct, selectedBrand, selectedConfiguration, selectedUom, isLoading } = useProduct()
onMounted(async () => {
    getAll()
})
</script>
<template>
    <Main>
        <section class="bg-white rounded-md shadow-md p-2 text-slate-700">Manage Product</section>
        <section class="mt-4 bg-white rounded shadow-md p-4">
            <!-- brand, uom, konfigurasi -->
            <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                <Card />

                <!--component  -->

            </section>
        </section>
        <section class="mt-4 bg-white p-4 rounded-md">
            <div class=" mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">
                <!-- Header -->
                <div class="mb-6">
                    <h1 class="text-xl font-semibold text-slate-800">
                        Create New Product
                    </h1>
                    <p class="text-sm text-slate-500">
                        Tambahkan product baru ke sistem
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="createProduct" class="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <!-- Username -->
                    <div class="md:col-span-2">
                        <label class="block text-sm text-slate-600 mb-1">
                            Nama Brand
                        </label>
                        <Multiselect v-model="selectedBrand" :options="dataBrand" label="name" track-by="id"
                            placeholder="Search brand" searchable />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Nama Barang
                        </label>
                        <input v-model="form.barang" type="text" placeholder="Nama Barang" class="input" />
                    </div>

                    <!-- Name -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Uom
                        </label>
                        <Multiselect v-model="selectedUom" :options="dataUom" label="name" track-by="id"
                            placeholder="Search Uom" searchable />
                    </div>

                    <!-- Phone -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Satuan UoM
                        </label>
                        <input v-model="form.satuanUom" type="text" placeholder="12000" class="input" />
                    </div>

                    <!-- Role -->

                    <!-- Password -->
                    <div class="md:col-span-1">
                        <label class="block text-sm text-slate-600 mb-1">
                            Karton
                        </label>
                        <input v-model="form.karton" type="text" placeholder="36000" class="input" />
                    </div>

                    <!-- Configurasi -->
                    <div class="md:col-span-1">
                        <label class="block text-sm text-slate-600 mb-1">
                            Konfigurasi
                        </label>
                        <Multiselect :loading="isLoading" v-model="selectedConfiguration" :options="dataConfiguration"
                            label="configuration" track-by="id" placeholder="Search Configuration" searchable />
                    </div>

                    <div class="md:col-span-1">
                        <label class="block text-sm text-slate-600 mb-1">
                            Barcode
                        </label>
                        <input v-model="form.barcode" type="text" placeholder="00000000" class="input" />
                    </div>

                    <!-- Action -->
                    <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                        <button type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                            {{ isLoadingCreateProduct ? 'Creating...' : 'Create Product' }}
                        </button>
                    </div>
                </form>
            </div>

        </section>
    </Main>
</template>