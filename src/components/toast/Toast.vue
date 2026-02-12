<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { Check, X, CircleAlert } from 'lucide-vue-next';
const { toasts, } = useToast()
</script>

<template>
    <div class="fixed top-15 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
        <TransitionGroup name="toast" tag="div" class="flex flex-col gap-3">
            <div v-for="toast in toasts" :key="toast.id"
                class="pointer-events-auto min-w-[280px] rounded-lg px-4 py-3 text-sm shadow-lg text-white" :class="{
                    ' bg-green-200': toast.type === 'success',
                    'bg-red-300': toast.type === 'error',
                    'bg-orange-200': toast.type === 'info'
                }">
                <div class="text-black flex items-center gap-2">
                    <span class="rounded-full border-emerald-600 border-2 p-1" v-if="toast.type === 'success'">
                        <Check class="text-emerald-600" />
                    </span>
                    <span class="rounded-full border-red-400 border-2 p-1" v-if="toast.type === 'error'">
                        <X class="text-red-400" />
                    </span>
                    <span class="rounded-full" v-if="toast.type === 'info'">
                        <CircleAlert :size="40" class="text-orange-400" />
                    </span>
                    <span class="font-sm text-slate-700">{{ toast.message }}</span>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style>
.toast-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.toast-enter-active,
.toast-leave-active {
    transition: all 0.25s ease;
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>