<script setup lang="ts">
import SideNav from '@/components/sideNav.vue';

</script>
<template>
    <div class="h-screen overflow-hidden">
        <SideNav />
        <main class="lg:ml-56 mt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-neutral-200 p-4 lg:p-6">
            <slot />
        </main>
    </div>
</template>