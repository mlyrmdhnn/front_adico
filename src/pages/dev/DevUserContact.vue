<script setup lang="ts">
import Main from '@/layouts/Main.vue'
import { Send, User } from 'lucide-vue-next'
import DevLayout from '@/layouts/DevLayout.vue';
import { useRoomChat } from '@/composables/developer/useRoomChat';
import { useChatDeveloper } from '@/composables/useChatDeveloper';
import { onMounted } from 'vue';
const { dataChat, getDetailChat, selectedUser, message, sendMsg } = useChatDeveloper()
const { isLoading, getDataUserChat, dataUserChat } = useRoomChat()

getDataUserChat()
const selectUser = async (user: any) => {
    selectedUser.value = user
    await getDetailChat()
}

const sendMessage = async () => {
    await sendMsg()
    await getDetailChat()
}

</script>

<template>

    <DevLayout>
        <div class="h-[calc(100vh-120px)] bg-white rounded-lg shadow flex overflow-hidden">

            <!-- SIDEBAR -->
            <aside class="w-72 border-r bg-slate-50 flex flex-col">
                <div class="p-4 border-b font-semibold text-sm text-slate-700">
                    Developer Chat
                </div>

                <div class="flex-1 overflow-y-auto">
                    <!-- Chat Item -->
                    <div v-for="i in dataUserChat" :key="i.id" @click="selectUser(i)"
                        class="px-4 py-3 cursor-pointer hover:bg-slate-100 border-b">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center">
                                <User :size="16" />
                            </div>
                            <div class="flex-1">
                                <div class="text-sm font-medium text-slate-800">
                                    {{ i?.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- CHAT AREA -->
            <section class="flex-1 flex flex-col">

                <!-- HEADER -->
                <div class="h-14 border-b px-4 flex items-center justify-between">
                    <div>
                        <div class="text-sm font-semibold text-slate-800">
                            {{ selectedUser?.name }}
                        </div>
                        <!-- <div class="text-xs text-green-600">
                            Online
                        </div> -->
                    </div>
                </div>

                <!-- MESSAGES -->
                <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-100">

                    <template v-for="c in dataChat" :key="c.id">
                        <div class="flex items-start gap-2"
                            :class="c.type === 'developer' ? 'justify-end' : 'justify-start'">
                            <!-- AVATAR (kiri untuk user, kanan untuk developer) -->
                            <div v-if="c.type === 'user'"
                                class="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center">
                                <User :size="14" />
                            </div>

                            <!-- CHAT BUBBLE -->
                            <div class="px-3 py-2 rounded-lg text-sm max-w-[70%] shadow" :class="c.type === 'developer'
                                ? 'bg-slate-800 text-white'
                                : 'bg-white text-slate-800 border'">
                                {{ c.chat }}
                            </div>

                            <!-- AVATAR KANAN (developer) -->
                            <div v-if="c.type === 'developer'"
                                class="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center">
                                D
                            </div>
                        </div>
                    </template>


                </div>

                <!-- INPUT -->
                <div class="border-t p-3">
                    <div class="flex items-center gap-2">
                        <input v-model="message" type="text" placeholder="Ketik pesan..."
                            class="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
                        <button @click="sendMessage" class="bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-900">
                            <Send :size="16" />
                        </button>
                    </div>
                </div>

            </section>
        </div>
    </DevLayout>
</template>