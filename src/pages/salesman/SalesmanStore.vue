<script setup lang="ts">
import SalesmanLayout from '@/layouts/SalesmanLayout.vue';
import { useStore } from '@/composables/useStore';
const { createStore, createStoreForm, isLoading, dataStore, getStore, getStoreNp, selectedStore } = useStore()
import Multiselect from 'vue-multiselect';
import { onMounted } from 'vue';
getStoreNp()


const storeLabel = (store: any) =>
    `${store.name} | ${store.address}`

</script>
<template>
    <SalesmanLayout>
        <section class="bg-white rounded-md p-2 text-slate-700">
            Create Store
        </section>
        <section class="bg-slate-100 p-6 mt-4">
            <div class=" mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">
                <!-- Header -->
                <div class="mb-6">
                    <h1 class="text-xl font-semibold text-slate-800">
                        Create New Store
                    </h1>
                    <p class="text-sm text-slate-500">
                        Tambahkan toko baru ke sistem
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Username -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Store name
                        </label>
                        <input v-model="createStoreForm.name" type="text" placeholder="Store name" class="input" />
                    </div>

                    <!-- Name -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Address
                        </label>
                        <input v-model="createStoreForm.address" type="text" placeholder="Store address"
                            class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Customer
                        </label>

                        <Multiselect v-if="dataStore" track-by="id" v-model="selectedStore" :options="dataStore"
                            placeholder="Select store" searchable label="name" />

                    </div>



                    <!-- Action -->
                    <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                        <button @click="createStore" type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                            {{ isLoading ? 'Creating...' : 'Create Store' }}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </SalesmanLayout>
</template>