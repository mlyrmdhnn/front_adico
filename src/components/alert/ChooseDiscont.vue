<script setup lang="ts">

import { ref, watch } from 'vue';
defineProps<{
    title?: string
}>()

const emit = defineEmits(['cancel', 'discount1', 'discount2',])


</script>

<template>
    <div class="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div class="w-[420px] bg-white rounded-xl shadow-2xl p-6 animate-scale-in">

            <!-- Header -->
            <div class="mb-5">
                <h2 class="text-lg font-semibold text-slate-900">
                    {{ title ?? 'Select Discount 1 or 2' }}
                </h2>
                <p class="text-sm text-slate-500 mt-1">
                    Please select the discount
                </p>
            </div>

            <!-- Content -->
            <div class="space-y-2">
                <label class="text-sm font-medium text-slate-600">
                    <!-- eg : 2.12/2.4/2 -->
                </label>
            </div>

            <div class="mt-4 flex gap-2">
                <button @click="emit('discount1')"
                    class="bg-sky-500 rounded p-2 cursor-pointer text-white transition-all duration-200 hover:bg-sky-600">Discount
                    1</button>
                <button @click="emit('discount2')"
                    class="bg-sky-500 rounded p-2 cursor-pointer text-white transition-all duration-200 hover:bg-sky-600">Discount
                    2</button>
            </div>

            <!-- Divider -->
            <div class="my-6 border-t border-slate-200"></div>

            <!-- Actions -->
            <div class="flex justify-end gap-3">
                <button class="
              px-4 py-2
              text-sm
              rounded-lg
              border border-slate-300
              text-slate-700
              hover:bg-slate-100
              transition
            " @click="emit('cancel')">
                    Cancel
                </button>
                <!-- 
                <button class="
              px-4 py-2
              text-sm
              rounded-lg
              bg-blue-600
              text-white
              hover:bg-blue-700
              shadow-sm
              transition
            " @click="emit('confirm')">
                    Save
                </button> -->
            </div>
        </div>
    </div>
</template>


<style scoped>
@keyframes scale-in {
    from {
        transform: scale(0.95);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-scale-in {
    animation: scale-in 0.15s ease-out;
}
</style>