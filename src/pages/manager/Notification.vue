<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import Multiselect from 'vue-multiselect';
import { useNotifications } from '@/composables/useNotifications';
import { onMounted } from 'vue';

const {
    isLoadingCreateGlobalNotif,
    formGlobalNotif,
    createGlobalNotif,

    dataUser,
    getUser,
    selectedUser,

    isLoadingCreateNotif,
    formNotif,
    createNotif
} = useNotifications()
onMounted(() => {
    getUser()
})

const customLabel = (user: any) => {
    return `${user.code} | ${user.name} | ${user.phone} `
}

</script>
<template>
    <Main>
        <section class="bg-slate-100 p-6">
            <div class=" mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">
                <!-- Header -->
                <div class="mb-6">
                    <h1 class="text-xl font-semibold text-slate-800">
                        Create Notification
                    </h1>
                    <p class="text-sm text-slate-500">
                        Kirim global notifikasi pada salesman
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="createGlobalNotif" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Username -->
                    <div class="col-span-2">
                        <label class="block text-sm text-slate-600 mb-1">
                            Title
                        </label>
                        <input v-model="formGlobalNotif.title" type="text" placeholder="Notification title"
                            class="input" />
                    </div>

                    <!-- Name -->
                    <div class="col-span-2">
                        <label class="block text-sm text-slate-600 mb-1">
                            Description
                        </label>
                        <textarea v-model="formGlobalNotif.description" type="text"
                            placeholder="Notification description" class="input" />
                    </div>

                    <!-- Action -->
                    <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                        <button type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                            {{ isLoadingCreateGlobalNotif ? 'Loading...' : 'Submit' }}
                        </button>
                    </div>
                </form>
            </div>
            <div class="mt-4 mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">
                <div class="mb-6">
                    <h1 class="text-xl font-semibold text-slate-800">
                        Create Notification
                    </h1>
                    <p class="text-sm text-slate-500">
                        Kirim notifikasi khusus pada salesman
                    </p>
                </div>

                <form @submit.prevent="createNotif" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="col-span-2">
                        <label class="block text-sm text-slate-600 mb-1">
                            Title
                        </label>
                        <input v-model="formNotif.title" type="text" placeholder="Notification title" class="input" />
                    </div>

                    <div class="col-span-2">
                        <label class="block text-sm text-slate-600 mb-1">
                            Description
                        </label>
                        <textarea v-model="formNotif.description" type="text" placeholder="Notification description"
                            class="input" />
                    </div>

                    <div class="col-span-2">
                        <label class="block text-sm text-slate-600 mb-1">
                            Description
                        </label>
                        <Multiselect :options="dataUser" :custom-label="customLabel" track-by="id"
                            v-model="selectedUser" />
                    </div>

                    <!-- Action -->
                    <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                        <button type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                            {{ isLoadingCreateNotif ? 'Loading...' : 'Submit' }}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </Main>
</template>