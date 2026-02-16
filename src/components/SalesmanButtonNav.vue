<script setup lang="ts">
const links = [
    { name: 'PO (Pre Order)', path: '/salesman/request' },
    { name: 'Create Customer/NOO', path: '/salesman/customer' },
    { name: 'Report Salesman', path: '/salesman/report' },
    { name: 'Customer Service', path: '/salesman/developer/support' },
    { name: 'Panduan', path: '/salesman/panduan' },
    { name: 'Program penjualan', path: '/salesman/notification' },
]
</script>

<template>
    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-3">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <router-link v-for="(l, i) in links" :key="i" :to="l.path" class="group flex items-center justify-center
                       rounded-lg border border-neutral-200
                       bg-neutral-50
                       px-4 py-3
                       text-sm font-medium text-neutral-700
                       transition-all duration-200
                       hover:bg-neutral-900 hover:text-white
                       hover:shadow-md hover:-translate-y-0.5
                       active:scale-95">
                {{ l.name }}
            </router-link>
        </div>
    </div>
</template>