<script setup lang="ts">
import SalesmanLayout from '@/layouts/SalesmanLayout.vue';
import { Send } from 'lucide-vue-next'
import { useChatDeveloper } from '@/composables/useChatDeveloper';
const { isLoading, message, sendMessage, historyChat, getMessage } = useChatDeveloper()
getMessage()
const formatDate = (date: any) => {
    if (!date) return '-'

    return new Date(date).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}
const sendChat = async () => {
    await sendMessage()
    await getMessage()
}
</script>

<template>
    <SalesmanLayout>
        <!-- {{ historyChat }} -->
        <div class=" mx-auto bg-white rounded-lg shadow flex flex-col h-[calc(100vh-120px)]">

            <!-- HEADER -->
            <div class="border-b px-5 py-4">
                <div class="text-sm font-semibold text-slate-800">
                    Hubungi developer
                </div>
            </div>

            <!-- CHAT BODY -->
            <div class="flex-1 overflow-y-auto px-5 py-4 space-y-6 bg-slate-50">

                <template v-for="c in historyChat" :key="c.id">
                    <div class="flex gap-3 items-start" :class="c.type === 'user' ? 'justify-end' : 'justify-start'">
                        <!-- AVATAR KIRI (DEVELOPER) -->
                        <div v-if="c.type === 'developer'" class="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center
             text-xs font-semibold">
                            D
                        </div>

                        <!-- MESSAGE -->
                        <div :class="c.type === 'user' ? 'text-right' : 'text-left'">
                            <div class="px-4 py-2 text-sm max-w-xl rounded-md" :class="c.type === 'user'
                                ? 'bg-slate-800 text-white'
                                : 'bg-white border text-slate-800'
                                ">
                                {{ c.chat }}
                            </div>

                            <div class="text-[11px] text-slate-400 mt-1">
                                {{ c.type === 'user' ? 'User' : 'Developer' }} • {{ formatDate(c.created_at) ?? '-' }}
                            </div>
                        </div>

                        <!-- AVATAR KANAN (USER) -->
                        <div v-if="c.type === 'user'" class="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center
             justify-center text-xs font-semibold">
                            U
                        </div>
                    </div>
                </template>

                <!-- SYSTEM MESSAGE -->
                <div class="text-center text-xs text-slate-400">
                    Percakapan ini disimpan untuk keperluan audit.
                </div>

            </div>

            <!-- INPUT -->
            <div class="border-t px-4 py-3 bg-white">
                <form @submit.prevent="sendChat" class="flex items-center gap-2">
                    <textarea v-model="message" rows="1" placeholder="Tulis pesan ke developer..." class="flex-1 resize-none rounded-md border px-3 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-slate-400" />

                    <button type="submit" class="p-2 rounded-md transition cursor-pointer text-white
             flex items-center justify-center"
                        :class="[isLoading ? 'bg-slate-600' : 'bg-slate-800 hover:bg-slate-900']">
                        <Send :size="16" />
                    </button>
                </form>
            </div>
        </div>
    </SalesmanLayout>
</template>