<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'confirm'): void
    (e: 'cancel'): void
}>()

</script>

<template>
    <div class="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div class="w-[420px] bg-white rounded-xl shadow-2xl p-6 animate-scale-in">

            <!-- Header -->
            <div class="mb-5">
                <h2 class="text-lg font-semibold text-slate-900">
                    {{ 'Edit Attendance Type' }}
                </h2>
            </div>

            <!-- Content -->
            <div class="space-y-2">
                <label class="text-xs font-medium text-slate-600">
                    Attendance type
                </label>
                <input :value="props.modelValue"
                    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" type="text"
                    class="input" placeholder="Attendance">
            </div>

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