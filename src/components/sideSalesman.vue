<script setup lang="ts">

import { LogOut, ShoppingCart, Menu } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useNotifications } from '@/composables/useNotifications';
import { useChatDeveloper } from '@/composables/useChatDeveloper';
const { userData, getMe, isLoading, logout } = useAuth()
import { useRoute } from 'vue-router';
const route = useRoute()
getMe()
const { getNotifCount, notificationCount, } = useNotifications()
const { getNotifChatCount, totalNotifChat } = useChatDeveloper()
getNotifCount()
getNotifChatCount()

interface Menu {
    name: string;
    path: string
    totalNotif: any
}

const menus = computed(() => {
    return [
        { name: 'Report Salesman', path: '/salesman/report' },
        { name: 'Program penjualan', path: '/salesman/notification', totalNotif: notificationCount.value },
        { name: 'Create PO', path: '/salesman/request' },
        { name: 'Create Customer/NOO', path: '/salesman/customer' },
        { name: 'Customer Service', path: '/salesman/developer/support', totalNotif: totalNotifChat.value },
        { name: 'Panduan', path: '/salesman/panduan' }
    ]
})

const now = ref<Date>(new Date())
let timer: number
let intervalId: number
onMounted(() => {
    timer = window.setInterval(() => {
        now.value = new Date()
    }, 1000)
    intervalId = window.setInterval(async () => {
        await getNotifChatCount()
    }, 5000)

})

onUnmounted(() => {
    clearInterval(timer)
    clearInterval(intervalId)
})

const isShow = ref<boolean>(false)
const setShow = () => {
    isShow.value = !isShow.value
}
</script>
<template>
    <!-- SIDEBAR -->
    <!-- Mobile -->


    <div v-if="isShow" class="fixed inset-0 z-40 lg:hidden">
        <div class="absolute inset-0 bg-black/40" @click="isShow = false"></div>
        <aside class="border-r border-neutral-300 bg-black lg:block fixed top-0 left-0 h-screen w-56 bg-slate-100">
            <div class="bg-neutral-100 p-4 flex items-center">
                <span class="rounded p-1 bg-[#1B211A] text-white">
                    <ShoppingCart />
                </span>
                <span class="font-semibold ml-2 text-[1.2rem] font-sans">Adico</span>
            </div>

            <div class="flex flex-col bg-neutral-100 h-full justify-between">
                <div class="flex flex-col gap-3 mt-4 px-2">
                    <template v-for="m in menus" :key="m.name">
                        <router-link :to="m.path" class="flex justify-between"
                            :class="['rounded p-1 transition-200', route.fullPath === m.path ? 'bg-neutral-300' : '']">
                            <span class="text-neutral-700 font-semibold">{{ m.name }}</span>
                            <span class="text-red-500" v-if="(m as any).totalNotif">
                                {{ (m as any).totalNotif }}
                            </span>
                        </router-link>
                    </template>
                </div>

                <div class="bg-neutral-100 border-neutral-200 border-t-2 mb-16 flex justify-between px-2">
                    <routerLink to="/salesman/profile">
                        <div class="px-2 py-2">
                            <h1 class="text-[16px] max-w-32 max-h-18 overflow-auto font-semibold text-slate-900">
                                <!-- {{ user?.name }} -->
                                {{ (userData as any)?.name }}
                            </h1>
                            <h1 class="text-sm">

                                {{ (userData as any)?.role }}
                            </h1>
                        </div>
                    </routerLink>

                    <button class="p-1 text-slate-500" @click="logout">
                        <LogOut class="cursor-pointer" />
                    </button>
                </div>
            </div>
        </aside>
    </div>

    <!-- Desktop -->
    <aside class="hidden border-r border-neutral-300 lg:block fixed top-0 left-0 h-screen w-56 bg-slate-100">
        <div class="bg-neutral-100 p-4 flex items-center">
            <span class="rounded p-1 bg-[#1B211A] text-white">
                <ShoppingCart />
            </span>
            <span class="font-semibold ml-2 text-[1.2rem] font-sans">Adico</span>
        </div>

        <div class="flex flex-col bg-neutral-100 h-full justify-between">
            <div class="flex flex-col gap-3 mt-4 px-2">
                <template v-for="m in menus" :key="m.name">
                    <router-link :to="m.path" class="flex justify-between"
                        :class="['rounded p-1 transition-200', route.fullPath === m.path ? 'bg-neutral-300' : '']">
                        <span class="text-neutral-700 font-semibold">{{ m.name }}</span>
                        <span class="text-red-500" v-if="(m as any).totalNotif">
                            {{ (m as any).totalNotif }}
                        </span>
                    </router-link>
                </template>
            </div>

            <div class="bg-neutral-100 border-neutral-200 border-t-2 mb-16 flex justify-between px-2">
                <routerLink to="/salesman/profile">
                    <div class="px-2 py-2">
                        <h1 class="text-[16px] max-w-32 max-h-18 overflow-auto font-semibold text-slate-900">
                            <!-- {{ user?.name }} -->
                            {{ (userData as any)?.name }}
                        </h1>
                        <h1 class="text-sm">

                            {{ (userData as any)?.role }}
                        </h1>
                    </div>
                </routerLink>

                <button class="p-1 text-slate-500" @click="logout">
                    <LogOut class="cursor-pointer" />

                </button>
            </div>
        </div>
    </aside>
    <!-- NAVBAR -->
    <header
        class="fixed flex px-2 items-center justify-between lg:pr-72 w-full top-0 lg:left-64 right-0 h-16 z-10 bg-neutral-100">
        <div>
            <span class="hidden lg:flex"></span>
            <span class="lg:hidden">
                <Menu @click="setShow" />
            </span>
        </div>
        <span class="p-1 rounded font-light">{{ now.toLocaleString() }}</span>
    </header>
</template>