<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import { useCustomer } from '@/composables/customer/useCustomer';
import { onMounted } from 'vue';
import { Trash2, Pencil } from 'lucide-vue-next';
import Delete from '@/components/alert/Delete.vue';
const { getDataCustomer, dataCustomer, links, isLoading, keyword, setDelete, showConfirmDelete, deleteCustomer } = useCustomer()
onMounted(async () => {
    getDataCustomer()
})
const getPage = (url: string) => {
    if (!url) return
    const params = new URL(url).searchParams
    return Number(params.get('page'))
}

</script>
<template>
    <Delete @cancel="showConfirmDelete = false" @confirm="deleteCustomer" v-if="showConfirmDelete" />
    <Main>
        <section class="bg-white p-2 rounded mb-4">
            <input v-model="keyword" type="text" name="" id="" class="input" placeholder="Search Customer">
        </section>
        <section class="bg-white rounded-md shadow-sm overflow-x-auto">
            <table class="min-w-[1200px] w-full border-collapse text-sm">
                <thead class="bg-neutral-100 border-b border-neutral-300">
                    <tr class="text-left text-neutral-700">
                        <th class="px-3 py-2 whitespace-nowrap">No</th>
                        <th class="px-3 py-2 whitespace-nowrap">Name</th>
                        <th class="px-3 py-2 whitespace-nowrap">NPWP</th>
                        <th class="px-3 py-2 whitespace-nowrap">Phone</th>
                        <th class="px-3 py-2 whitespace-nowrap">Store Name & address</th>
                        <!-- <th class="px-3 py-2 whitespace-nowrap">Action</th> -->
                    </tr>
                </thead>

                <tbody v-if="!isLoading && dataCustomer.length">
                    <tr v-for="(c, i) in dataCustomer" :key="c.id ?? i"
                        class="border-b border-neutral-300 hover:bg-neutral-50">
                        <td class="px-3 py-2 whitespace-nowrap">{{ i + 1 }}</td>
                        <td class="px-3 py-2 whitespace-nowrap">{{ c.name }}</td>
                        <td class="px-3 py-2 whitespace-nowrap">{{ c.npwp ? c.npwp : 'Tidak Disertakan' }}</td>
                        <td class="px-3 py-2 whitespace-nowrap">{{ c.phone }}</td>
                        <td v-if="c.store.length > 0" class="px-3 py-2">
                            <ul class="space-y-1">
                                <li v-for="s in c.store" :key="s.id" class="border rounded px-2 py-1 text-xs">
                                    <div class="font-medium">{{ s.name }}</div>
                                    <div class="text-neutral-500">{{ s.address }}</div>
                                </li>
                            </ul>
                        </td>
                        <td v-else class="px-3 py-2 whitescpace-nowrao">Tidak Disertakan</td>
                        <!-- <td class="px-3 py-2 whitespace-nowrap">
                            <div class="flex gap-2 text-white">
                                <button @click="setDelete(c.id)" class="bg-red-500 p-1 rounded">
                                    <Trash2 :size="20" />
                                </button>
                                <routerLink :to="`/customer/edit?id=${c.id}`" class="bg-sky-500 rounded p-1">
                                    <Pencil :size="20" />
                                </routerLink>
                            </div>
                        </td> -->
                    </tr>
                </tbody>

            </table>
            <div v-if="isLoading"
                class="h-[450px] w-full flex justify-center items-center text-2xl text-slate-700 font-semibold">
                Loading...
            </div>
            <div v-if="!isLoading && dataCustomer.length < 0"
                class="h-[450px] w-full flex justify-center items-center text-2xl text-slate-700 font-semibold">
                Sorry, we can't found {{ keyword }}
            </div>
        </section>
        <div class="flex items-center gap-1 mt-4 flex-wrap">
            <button v-for="(link, i) in links" :key="i" :disabled="!link.url" v-html="link.label"
                @click="getDataCustomer(getPage(link.url))" class="
      min-w-[36px]
      h-9
      px-3
      flex items-center justify-center
      rounded-md
      border
      text-sm
      font-medium
      transition
      duration-150
    " :class="{
        'bg-neutral-900 text-white border-neutral-900': link.active,
        'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100': !link.active && link.url,
        'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed': !link.url
    }" />
        </div>

    </Main>
</template>