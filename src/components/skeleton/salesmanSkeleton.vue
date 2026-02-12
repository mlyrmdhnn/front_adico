<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next';
</script>
<template>
    <div v-for="(d, i) in 6" :key="i" class="rounded-lg border border-slate-200 bg-neutral-300 p-4 shadow-sm
           transition hover:shadow-md hover:scale-105 transition-all duration-200">
        <div class="mb-3 text-sm font-semibold text-neutral-300">
            Data Salesman
        </div>

        <div class="space-y-1 text-sm text-slate-600">
            <div class="flex justify-between">
                <span class="text-neutral-300">Kode</span>
                <span class="font-medium text-neutral-300">ok</span>
            </div>

            <div class="flex justify-between">
                <span class="text-neutral-300">Nama</span>
                <span class="font-medium text-neutral-300">Salesman </span>
            </div>

            <div class="flex justify-between">
                <span class="text-neutral-300">Phone</span>
                <span class="font-medium text-neutral-300">ok</span>
            </div>
        </div>
        <div class="mt-2">
            <button class="text-neutral-300 px-2 py-1 rounded ">
                <Trash2 />
            </button>
        </div>
    </div>
</template>