<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import { useRoute } from 'vue-router';
import { useCustomer } from '@/composables/customer/useCustomer';
import { onMounted, ref } from 'vue';
import Multiselect from 'vue-multiselect';

// inisialisasi
const route = useRoute()
const { getCustomerDetail, dataCustomer, isLoading, formEditCustomer, selectedStore, getStore, dataStore, editCustomer } = useCustomer()
console.log(route.query.id)
onMounted(() => {
    getCustomerDetail(route.query.id)
    getStore()
    console.log(route.query)
})



</script>
<template>
    <Main>
        <section class="bg-white rounded-md p-2 text-slate-700">
            Edit Customer
        </section>
        <section class="bg-slate-100 p-6 mt-4">
            <div class=" mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">
                <!-- Form -->
                <form @submit.prevent="" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Outlet
                        </label>
                        <input v-model="formEditCustomer.store_name" type="text" placeholder="Outlet Name"
                            class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Store Address
                        </label>
                        <input v-model="formEditCustomer.address" type="text" placeholder="Store Address"
                            class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Phone
                        </label>
                        <input v-model="formEditCustomer.phone" type="text" placeholder="08XXXXXXXXXX" class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Npwp
                        </label>
                        <input v-model="formEditCustomer.npwp" type="text" placeholder="NPWP" class="input" />
                    </div>


                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            PIC
                        </label>
                        <input v-model="formEditCustomer.pic" type="text" placeholder="PIC" class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            RE
                        </label>
                        <select v-model="formEditCustomer.re" name="" id="" class="input">
                            <option value="Senin">Senin</option>
                            <option value="Selasa">Selasa</option>
                            <option value="Rabu">Rabu</option>
                            <option value="Kamis">Kamis</option>
                            <option value="Jumat">Jumat</option>
                            <option value="Sabtu">Sabtu</option>
                        </select>
                    </div>

                    <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                        <button @click="editCustomer" type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                            {{ isLoading ? 'Saving...' : 'Save Change' }}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </Main>
</template>