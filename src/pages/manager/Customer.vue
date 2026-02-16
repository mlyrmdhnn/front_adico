<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import { useCustomer } from '@/composables/customer/useCustomer';
import { onMounted } from 'vue';
import { Trash2, Pencil } from 'lucide-vue-next';
import Delete from '@/components/alert/Delete.vue';
const { getDataCustomer, dataCustomer, links, isLoading, keyword, setDelete, showConfirmDelete, deleteCustomer } = useCustomer()
onMounted(async () => {
    await getDataCustomer()
    console.log(dataCustomer.value)
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
                        <th class="px-3 py-2 whitespace-nowrap">Customer Code</th>
                        <th class="px-3 py-2 whitespace-nowrap">Name</th>
                        <th class="px-3 py-2 whitespace-nowrap">NPWP</th>
                        <th class="px-3 py-2 whitespace-nowrap">Phone</th>
                        <th class="px-3 py-2 whitespace-nowrap">Address</th>
                        <th class="px-3 py-2 whitespace-nowrap">PIC</th>
                        <th class="px-3 py-2 whitespace-nowrap">RE</th>
                        <th class="px-3 py-2 whitespace-nowrap">Created By</th>
                        <th class="px-3 py-2 whitespace-nowrap">Actions</th>
                    </tr>
                </thead>

                <tbody v-if="!isLoading && dataCustomer.length">
                    <tr v-for="(c, i) in dataCustomer" :key="c.id ?? i"
                        class="border-b border-neutral-300 hover:bg-neutral-50">
                        <td class="px-3 py-2 whitespace-nowrap">{{ i + 1 }}</td>
                        <td class="px-3 py-2 whitespace-nowrap">{{ c.customer_code }}</td>
                        <td class="px-3 py-2 whitespace-nowrap">{{ c.store_name }}</td>
                        <td class="px-3 py-2 whitespace-nowrap">{{ c.npwp ? c.npwp : '-' }}</td>
                        <td class="px-3 py-2 whitespace-nowrap">{{ c.phone ? c.phone : '-' }}</td>
                        <td class="px-3 py-2 whitespace-nowrap">{{ c.address }}</td>
                        <td class="px-3 py-2 whitespace-nowrap">{{ c.pic ? c.pic : '-' }}</td>
                        <td class="px-3 py-2 whitespace-nowrap">{{ c.re ? c.re : '-' }}</td>
                        <td class="px-3 py-2 whitespace-nowrap">{{ c.created_by_salesman ? c.created_by_salesman.name :
                            '-'
                        }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap">
                            <div class="gap-2 flex">
                                <button @click="setDelete(c.id)"
                                    class="bg-red-500 p-1 rounded text-white cursor-pointer">
                                    <Trash2 :size="20" />
                                </button>
                                <routerLink :to="`/customer/edit?id=${c.id}`"
                                    class="bg-sky-500 p-1 rounded text-white cursor-pointer">
                                    <Pencil :size="20" />
                                </routerLink>
                            </div>
                        </td>
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