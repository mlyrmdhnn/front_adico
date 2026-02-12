<script setup lang="ts">
// import { useInbox } from '@/composables/useInbox';
import { useRequestNotif } from '@/composables/useRequestNotif';
import { LogOut, ShoppingCart, Menu } from 'lucide-vue-next'
import { Headset } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
const { user } = useAuthStore()
const { userData, getMe, isLoading, logout } = useAuth()
import { useRoute } from 'vue-router';
const route = useRoute()
const { inboxCount, count } = useRequestNotif()

getMe()
inboxCount()
let intervalId: number | undefined

onMounted(() => {
    intervalId = window.setInterval(async () => {
        await inboxCount()
    }, 3000)
})

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = undefined
    }
})


const notifications = ref(9)

const menus = computed(() => {
    if (user?.role === 'manager') {
        return [
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Inbox', path: '/inbox', totalNotif: count.value },
            { name: 'Notification', path: '/notification' },
            { name: 'Customer', path: '/customers' },
            { name: 'Produk', path: '/product' },
            { name: 'Manage Product', path: '/product/manage' },
            { name: 'Salesman', path: '/salesman' },
            { name: 'Supervisor', path: '/supervisor' },
            { name: 'Store', path: '/store' },
            { name: 'Developer Support', path: '/bantuan' },
            { name: 'Panduan', path: '/panduan' }
        ]
    }

    return [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Inbox', path: '/inbox', totalNotif: count.value },
        { name: 'Notification', path: '/notification' },
        { name: 'Customer', path: '/customers' },
        { name: 'Produk', path: '/product' },
        { name: 'Manage Product', path: '/product/manage' },
        { name: 'Salesman', path: '/salesman' },
        { name: 'Store', path: '/store' },
        { name: 'Developer Support', path: '/bantuan' },
        { name: 'Panduan', path: '/panduan' }
    ]
})

const now = ref<Date>(new Date())
let timer: number
onMounted(() => {
    timer = window.setInterval(() => {
        now.value = new Date()
    }, 1000)
})

onUnmounted(() => {
    clearInterval(timer)
})

const isShow = ref<boolean>(false)
const setShow = () => {
    isShow.value = !isShow.value
}
</script>
<template>
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
                            <span class="text-red-500" v-if="m.totalNotif">
                                {{ m.totalNotif }}
                            </span>
                        </router-link>
                    </template>
                </div>

                <div class="bg-neutral-100 border-neutral-200 border-t-2 mb-16 flex justify-between px-2">
                    <routerLink to="/proffile">
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
                        <!-- <div role="status">
                        <svg aria-hidden="true" class="w-6 h-6 text-neutral-tertiary animate-spin fill-brand"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                    </div> -->
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
                        <span class="text-red-500" v-if="m.totalNotif">
                            {{ m.totalNotif }}
                        </span>
                    </router-link>
                </template>
            </div>

            <div class="bg-neutral-100 border-neutral-200 border-t-2 mb-16 flex justify-between px-2">
                <routerLink to="/proffile">
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