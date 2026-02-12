<script setup lang="ts">
import SideSalesman from '@/components/sideSalesman.vue';

</script>
<template>
    <div class="h-screen overflow-hidden">
        <SideSalesman />
        <main class="lg:ml-56 mt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-neutral-200 p-4 lg:p-6">
            <slot />
        </main>
    </div>
</template>