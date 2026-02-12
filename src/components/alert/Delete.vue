<script setup lang="ts">
defineProps<{
    title?: string
    description?: string
}>()

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
    <div class="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div class="w-[420px] bg-white rounded-xl shadow-xl p-6 animate-scale-in">
            <!-- Icon -->
            <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v3m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
                </svg>
            </div>

            <!-- Content -->
            <h2 class="text-lg font-semibold text-gray-900">
                {{ title ?? 'Delete Confirmation' }}
            </h2>

            <p class="text-sm text-gray-600 mt-2 leading-relaxed">
                {{ description ?? 'This action is permanent and cannot be undone.' }}
            </p>

            <!-- Actions -->
            <div class="flex justify-end gap-3 mt-6">
                <button
                    class="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                    @click="emit('cancel')">
                    Cancel
                </button>

                <button
                    class="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow-sm cursor-pointer"
                    @click="emit('confirm')">
                    Yes, delete
                </button>
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