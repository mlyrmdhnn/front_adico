<script setup lang="ts">
defineProps<{
    title?: string
    description?: string
    type?: any[]
    selectedType: number
}>()

const emit = defineEmits(['confirm', 'cancel', 'update:selectedType'])

const updateSelectedType = (e: Event) => {
    const val = Number((e.target as HTMLSelectElement).value)
    emit('update:selectedType', val)
}
</script>

<template>
    <div class="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div class="w-[420px] bg-white rounded-xl shadow-2xl p-6 animate-scale-in">

            <!-- Header -->
            <div class="mb-5">
                <h2 class="text-lg font-semibold text-slate-900">
                    {{ title ?? 'Edit Attendance' }}
                </h2>
                <p class="text-sm text-slate-500 mt-1">
                    Select attendance type for this salesman
                </p>
            </div>

            <!-- Content -->
            <div class="space-y-2">
                <label class="text-xs font-medium text-slate-600">
                    Attendance Type
                </label>

                <select :value="selectedType" @change="updateSelectedType" class="
              w-full
              h-10
              rounded-lg
              border border-slate-300
              bg-white
              px-3
              text-sm text-slate-700
              shadow-sm
              focus:outline-none
              focus:border-blue-500
              focus:ring-1
              focus:ring-blue-500
              hover:border-slate-400
            ">
                    <option v-for="(t, i) in type" :key="i" :value="t.id">
                        {{ t.type }}
                    </option>
                </select>
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