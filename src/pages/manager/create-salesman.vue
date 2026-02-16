<script setup lang="ts">
import { ref } from 'vue';
import Main from '@/layouts/Main.vue';
import { useSalesman } from '@/composables/salesman/useSalesman';
import { Eye, EyeOff } from 'lucide-vue-next';
const { isLoading, createSalesman, form } = useSalesman()
const showPassword = ref(false)
</script>
<template>
    <Main>
        <section class="bg-slate-100 p-6">
            <div class=" mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">
                <!-- Header -->
                <div class="mb-6">
                    <h1 class="text-xl font-semibold text-slate-800">
                        Create New Salesman
                    </h1>
                    <p class="text-sm text-slate-500">
                        Tambahkan salesman baru ke sistem
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="createSalesman" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Username -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Username
                        </label>
                        <input v-model="form.username" type="text" placeholder="username" class="input" />
                    </div>

                    <!-- Name -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Name
                        </label>
                        <input v-model="form.name" type="text" placeholder="Full name" class="input" />
                    </div>

                    <!-- Phone -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Phone Number
                        </label>
                        <input v-model="form.phone" type="text" placeholder="08xxxxxxxxxx" class="input" />
                    </div>

                    <!-- Role -->

                    <!-- Password -->
                    <div class="space-y-1">
                        <label class="block text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <div class="relative">
                            <input v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                autocomplete="current-password" placeholder="••••••••" class="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-sm
                   focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800
                   transition duration-150 ease-in-out" required />

                            <!-- Toggle Button -->
                            <button type="button" class="absolute inset-y-0 right-0 flex items-center justify-center
                   w-10 text-slate-400 hover:text-slate-700
                   focus:outline-none focus:text-slate-900
                   transition">
                                <!-- ICON (ganti via v-if nanti) -->
                                <template v-if="!showPassword">
                                    <Eye @click="showPassword = !showPassword" class="w-5 h-5" />
                                </template>
                                <!-- atau -->
                                <template v-if="showPassword">
                                    <EyeOff @click="showPassword = !showPassword" class="w-5 h-5" />
                                </template>
                            </button>
                        </div>
                    </div>

                    <div class="">
                        <label class="block text-sm text-slate-600 mb-1">
                            Hari Kerja
                        </label>
                        <input v-model="form.hari_kerja" type="number" placeholder="Hari Kerja" class="input" />
                    </div>

                    <div class="">
                        <label class="block text-sm text-slate-600 mb-1">
                            Target
                        </label>
                        <input v-model="form.target" type="number" placeholder="Target" class="input" />
                    </div>

                    <!-- Action -->
                    <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                        <button type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                            {{ isLoading ? 'Creating...' : 'Create Salesman' }}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </Main>
</template>