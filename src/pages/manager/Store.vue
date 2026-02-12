<script setup lang="ts">
import Main from '@/layouts/Main.vue'
import { useStore } from '@/composables/useStore'
import { onMounted } from 'vue'
import { Trash2, Pencil } from 'lucide-vue-next'
import Delete from '@/components/alert/Delete.vue'

const { getStore, isLoadingGet, storeData, links, keyword, showConfirmDelete, deleteStore, setConfirmDelete } = useStore()

onMounted(() => {
    getStore()
})

const getPage = (url: string) => {
    if (!url) return
    const params = new URL(url).searchParams
    return Number(params.get('page'))
}
</script>

<template>
    <Delete @cancel="showConfirmDelete = false" @confirm="deleteStore" v-if="showConfirmDelete" />
    <Main>

        <!-- SEARCH -->
        <section class="bg-white p-2 rounded mb-4">
            <input v-model="keyword" type="text" class="input" placeholder="Search Store">
        </section>

        <!-- TABLE -->
        <section class="bg-white rounded-md shadow-sm overflow-x-auto">
            <table class="min-w-[1200px] w-full border-collapse text-sm">
                <thead>
                    <tr class="text-left text-neutral-700">
                        <th class="px-3 py-2">No</th>
                        <th class="px-3 py-2">Name</th>
                        <th class="px-3 py-2">Address</th>
                        <th class="px-3 py-2">Actions</th>
                    </tr>
                </thead>

                <tbody v-if="!isLoadingGet">
                    <tr v-for="(p, i) in storeData" :key="p.id" class="border-b border-neutral-200 hover:bg-neutral-50">
                        <td class="px-3 py-2">{{ i + 1 }}</td>
                        <td class="px-3 py-2">{{ p.name }}</td>
                        <td class="px-3 py-2">{{ p.address }}</td>
                        <td class="px-3 py-2">
                            <div class="flex gap-2">
                                <button @click="setConfirmDelete(p.id)" class="bg-red-500 p-1 rounded text-white">
                                    <Trash2 :size="20" />
                                </button>
                                <router-link :to="`/store/edit?id=${p.id}`" class="bg-sky-500 p-1 rounded text-white">
                                    <Pencil :size="20" />
                                </router-link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="isLoadingGet"
                class="h-[450px] w-full flex justify-center items-center text-2xl text-slate-700 font-semibold">
                Loading...
            </div>
        </section>

        <!-- PAGINATION -->
        <div class="flex items-center gap-1 mt-4 flex-wrap">
            <button v-for="(link, i) in links" :key="i" :disabled="!link.url" v-html="link.label"
                @click="getStore(getPage(link.url))"
                class="min-w-[36px] h-9 px-3 flex items-center justify-center rounded-md border text-sm font-medium"
                :class="{
                    'bg-neutral-900 text-white border-neutral-900': link.active,
                    'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100': !link.active && link.url,
                    'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed': !link.url
                }" />
        </div>

    </Main>
</template>