<script setup lang="ts">
import SalesmanLayout from '@/layouts/SalesmanLayout.vue';
import { useCustomer } from '@/composables/customer/useCustomer';
const { isLoadingCreate, createCustomer, formCreateCustomer } = useCustomer()
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
                        Create New Customer
                    </h1>
                    <p class="text-sm text-slate-500">
                        Tambahkan customer baru ke sistem
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="createCustomer" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Username -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Customer Name
                        </label>
                        <input v-model="formCreateCustomer.name" type="text" placeholder="Customer name"
                            class="input" />
                    </div>

                    <!-- Name -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Customer Phone
                        </label>
                        <input v-model="formCreateCustomer.phone" type="number" placeholder="Customer Phone"
                            class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Customer NPWP (opsional)
                        </label>
                        <input v-model="formCreateCustomer.npwp" type="number" placeholder="Customer NPWP"
                            class="input" />
                    </div>


                    <!-- Password -->


                    <!-- Action -->
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