<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import { useSalesman } from '@/composables/salesman/useSalesman';
import useSupervisor from '@/composables/useSupervisor';
const { isLoading, createSalesman, form } = useSalesman()
const { supervisorForm, createSupervisor, isLoadingCreateSupervisor } = useSupervisor()
</script>
<template>
    <Main>
        <section class="bg-slate-100 p-6">
            <div class=" mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">
                <!-- Header -->
                <div class="mb-6">
                    <h1 class="text-xl font-semibold text-slate-800">
                        Create New Supervisor
                    </h1>
                    <p class="text-sm text-slate-500">
                        Tambahkan Supervisor baru ke sistem
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="createSupervisor" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Username -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Username
                        </label>
                        <input v-model="supervisorForm.username" type="text" placeholder="username" class="input" />
                    </div>

                    <!-- Name -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Name
                        </label>
                        <input v-model="supervisorForm.name" type="text" placeholder="Full name" class="input" />
                    </div>

                    <!-- Phone -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Phone Number
                        </label>
                        <input v-model="supervisorForm.phone" type="text" placeholder="08xxxxxxxxxx" class="input" />
                    </div>

                    <!-- Password -->
                    <div class="">
                        <label class="block text-sm text-slate-600 mb-1">
                            Password
                        </label>
                        <input v-model="supervisorForm.password" type="password" placeholder="••••••••" class="input" />
                    </div>

                    <!-- Action -->
                    <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                        <button type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                            {{ isLoadingCreateSupervisor ? 'Creating...' : 'Create Supervisor' }}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </Main>
</template>