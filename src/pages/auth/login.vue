<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth';
const { isLoading, login, form, message } = useAuth()


</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-100">
        <div class="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
            <!-- Header -->
            <div class="mb-6 text-center">
                <h1 class="text-2xl font-semibold text-slate-800">Login</h1>
                <p class="text-sm text-slate-500 mt-1">
                    Sign in to sales order adico
                </p>
            </div>

            <!-- Form -->
            <form class="space-y-4" @submit.prevent="login">
                <!-- Username -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">
                        Username
                    </label>
                    <input v-model="form.username" type="text" autocomplete="username" placeholder="username" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800" required />
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">
                        Password
                    </label>
                    <input v-model="form.password" type="password" autocomplete="current-password"
                        placeholder="••••••••" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800" required />
                </div>

                <div class="mt-2 mb-2">
                    <span class="text-red-500">{{ message }}</span>
                </div>

                <!-- Action -->
                <button type="submit" class="w-full mt-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium
                     text-white hover:bg-slate-900 transition">
                    {{ isLoading ? 'Authenticating...' : 'Login' }}
                </button>
            </form>
        </div>
        <!-- <button @click="refresh" class="bg-green-500 p-2 rounded text-white cursor-pointer">okma</button> -->
    </div>
</template>