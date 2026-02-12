<script setup lang="ts">
import SalesmanLayout from '@/layouts/SalesmanLayout.vue';
import { useNotifications } from '@/composables/useNotifications';
import { onMounted } from 'vue';
const { salesmanGetNotification, salesmanNotifData, isLoadingGetNotif, getNotifCount, readNotif } = useNotifications()
salesmanGetNotification()
onMounted(async () => {
    await readNotif()
    await getNotifCount()
})
</script>
<template>
    <SalesmanLayout>
        <div class="space-y-3">
            <div v-for="d in salesmanNotifData" :key="d.id" class="p-4 rounded-lg border-l-4" :class="[
                d.type === 'global'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-yellow-500 bg-yellow-50'
            ]">
                <!-- Header -->
                <div class="flex items-center justify-between mb-1">
                    <h2 class="font-semibold text-gray-800">
                        {{ d.title }}
                    </h2>

                    <span class="text-xs px-2 py-0.5 rounded-full" :class="[
                        d.type === 'global'
                            ? 'bg-blue-200 text-blue-800'
                            : 'bg-yellow-200 text-yellow-800'
                    ]">
                        {{ d.type }}
                    </span>
                </div>

                <!-- Description -->
                <p class="text-sm text-gray-600">
                    {{ d.description }}
                </p>

                <!-- Footer -->
                <div class="mt-2 text-xs text-gray-500">
                    Status:
                    <span :class="d.isRead ? 'text-green-600' : 'text-red-600'">
                        {{ d.isRead ? 'Dibaca' : 'Belum dibaca' }}
                    </span>
                </div>
            </div>
        </div>
    </SalesmanLayout>
</template>