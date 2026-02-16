<script setup lang="ts">
import SalesmanLayout from '@/layouts/SalesmanLayout.vue';
import { useCustomer } from '@/composables/customer/useCustomer';
import SalesmanButtonNav from '@/components/SalesmanButtonNav.vue';
import { ref } from 'vue';
const { isLoadingCreate, createCustomer, formCreateCustomer } = useCustomer()
const isPkp = ref(false)
const hari = [
    { name: 'Senin' },
    { name: 'Selasa' },
    { name: 'Rabu' },
    { name: 'Kamis' },
    { name: 'Jumat' },
    { name: 'Sabtu' },
]
</script>
<template>
    <SalesmanLayout>
        <div>
            <SalesmanButtonNav class="mb-4" />
        </div>
        <section class="bg-white rounded-md p-2 text-slate-700">
            Create Customer/NOO
        </section>
        <section class="bg-slate-100 p-6 mt-4">
            <div class=" mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">
                <!-- Header -->
                <div class="mb-6">
                    <h1 class="text-xl font-semibold text-slate-800">
                        Create New Customer
                    </h1>
                    <p class="text-sm text-slate-500">
                        Tambahkan customer baru ke sistem
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="createCustomer" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Nama Customer
                        </label>
                        <input v-model="formCreateCustomer.name" type="text" placeholder="Nama Customer"
                            class="input" />
                    </div> -->

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            No Hp Customer
                        </label>
                        <input v-model="formCreateCustomer.phone" type="text" placeholder="No Hp Customer"
                            class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            pkp
                        </label>
                        <span @click="isPkp = !isPkp" :class="[
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none',
                            isPkp ? 'bg-[#1B211A]' : 'bg-gray-300'
                        ]">
                            <span :class="[
                                'inline-block h-4 w-4 transform rounded-full bg-white transition duration-200',
                                isPkp ? 'translate-x-6' : 'translate-x-1'
                            ]" />
                        </span>
                    </div>

                    <div v-if="isPkp">
                        <label class="block text-sm text-slate-600 mb-1">
                            Customer NPWP
                        </label>
                        <input v-model="formCreateCustomer.npwp" type="text" placeholder="Customer NPWP"
                            class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Nama Outlet
                        </label>
                        <input v-model="formCreateCustomer.storeName" type="string" placeholder="Nama Outlet"
                            class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Alamat Outlet
                        </label>
                        <input v-model="formCreateCustomer.address" type="string" placeholder="Alamat Outlet"
                            class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            PIC
                        </label>
                        <input v-model="formCreateCustomer.pic" type="string" placeholder="PIC" class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            RE
                        </label>
                        <select v-model="formCreateCustomer.re" name="" id="" class="input">
                            <option selected value="">-- Pilih Hari --</option>
                            <option v-for="(h, i) in hari" :key="i" :value="h.name">{{ h.name }}</option>
                        </select>
                    </div>


                    <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                        <button @click="" type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                            {{ isLoadingCreate ? 'Creating...' : 'Create Customer' }}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </SalesmanLayout>
</template>