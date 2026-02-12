<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import { useProduct } from '@/composables/product/useProduct';
import { useRoute } from 'vue-router';
const route = useRoute()
const id = route.query
import Multiselect from 'vue-multiselect';
import { onMounted } from 'vue';

const { getAll, dataBrand, dataUom, dataConfiguration, selectedBrand, selectedConfiguration, selectedUom, getDetailProduct, editForm, isLoading, editProduct, isFound } = useProduct()
onMounted(async () => {
    await getDetailProduct((id as any).id)
    await getAll()
})
</script>
<template>
    <Main>

        <div v-if="!route.query">
            No Query
        </div>
        <div v-if="!isFound" class="flex flex-col items-center justify-center py-16 text-center text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-slate-300 mb-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008h-.008V9.75zM9 14s1.5 1.5 3 1.5S15 14 15 14" />
            </svg>

            <h2 class="text-lg font-semibold text-slate-700">
                Product not found
            </h2>

            <p class="text-sm text-slate-500 mt-1 max-w-sm">
                The product you are looking for doesn’t exist or may have been removed.
            </p>
        </div>

        <template v-if="isFound">
            <section class="bg-white rounded-md shadow-md p-2 text-slate-700">Edit Product</section>

            <section class="mt-4 bg-white p-4 rounded-md">
                <div class=" mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">
                    <!-- Header -->
                    <div class="mb-6">
                        <h1 class="text-xl font-semibold text-slate-800">
                            Edit the product
                        </h1>
                        <p class="text-sm text-slate-500">
                            Edit product
                        </p>
                    </div>

                    <!-- Form -->
                    <form @submit.prevent="editProduct" class="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <!-- Username -->
                        <div>
                            <label class="block text-sm text-slate-600 mb-1">
                                Nama Brand
                            </label>
                            <Multiselect v-model="selectedBrand" :options="dataBrand" label="name" track-by="id"
                                placeholder="Search brand" searchable />
                        </div>

                        <!-- Username -->
                        <div>
                            <label class="block text-sm text-slate-600 mb-1">
                                Nama Barang
                            </label>
                            <input v-model="editForm.barang" type="text" placeholder="username" class="input" />
                        </div>

                        <!-- Name -->
                        <div>
                            <label class="block text-sm text-slate-600 mb-1">
                                Uom
                            </label>
                            <!-- <option v-for="(u, i) in dataUom" :key="i" :value="u.id" @click="setSelectedUom(u.id)">{{
                        u.name }}</option> -->
                            <Multiselect v-model="selectedUom" :options="dataUom" label="name" track-by="id"
                                placeholder="Search Uom" searchable />
                        </div>

                        <!-- Phone -->
                        <div>
                            <label class="block text-sm text-slate-600 mb-1">
                                Satuan UoM
                            </label>
                            <input v-model="editForm.satuanUom" type="text" placeholder="08xxxxxxxxxx" class="input" />
                        </div>

                        <!-- Role -->

                        <!-- Password -->
                        <div class="md:col-span-1">
                            <label class="block text-sm text-slate-600 mb-1">
                                Karton
                            </label>
                            <input v-model="editForm.karton" type="text" placeholder="••••••••" class="input" />
                        </div>

                        <!-- Configurasi -->
                        <div class="md:col-span-1">
                            <label class="block text-sm text-slate-600 mb-1">
                                Konfigurasi
                            </label>
                            <Multiselect v-model="selectedConfiguration" :options="dataConfiguration"
                                label="configuration" track-by="id" placeholder="Search Configuration" searchable />
                        </div>

                        <div>
                            <label class="block text-sm text-slate-600 mb-1">
                                Discount
                            </label>
                            <input v-model="editForm.discount1" type="number" name="" id="" class="input">
                        </div>

                        <div class="md:col-span-1">
                            <label class="block text-sm text-slate-600 mb-1">
                                Barcode
                            </label>
                            <input v-model="editForm.barcode" type="text" placeholder="••••••••" class="input" />
                        </div>

                        <!-- Action -->
                        <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                            <button type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                           bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                                {{ isLoading ? 'Saving...' : 'Edit Product' }}
                            </button>
                        </div>
                    </form>
                </div>

            </section>
        </template>
    </Main>
</template>