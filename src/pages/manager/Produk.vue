<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import { Trash2, Pencil } from 'lucide-vue-next';
import { useProduct } from '@/composables/product/useProduct';
import { onMounted } from 'vue';
import Delete from '@/components/alert/Delete.vue';
import { formatRupiah } from '@/helper/formatRupiah';
const { getProduct, keyword, dataProduct, links, isLoading, deleteProduct, showConfirmDelete, isConfirmDelete } = useProduct()
onMounted(() => {
    getProduct()
})
const getPage = (url: string) => {
    if (!url) return
    const params = new URL(url).searchParams
    return Number(params.get('page'))
}
</script>
<template>

    <Delete @cancel="showConfirmDelete = false" @confirm="deleteProduct" v-if="showConfirmDelete" />
    <Main>
        <section class="bg-white p-2 rounded mb-4">
            <input v-model="keyword" type="text" name="" id="" class="input" placeholder="Search Product">
        </section>
        <section class="bg-white rounded-md shadow-sm overflow-x-auto">
            <table class="min-w-[1200px] w-full border-collapse text-sm">
                <thead>
                    <tr class="text-left text-neutral-700">
                        <th class="px-3 py-2 whitescape-nowrap">No</th>
                        <th class="px-3 py-2 whitescape-nowrap">Name</th>
                        <th class="px-3 py-2 whitescape-nowrap">Brand</th>
                        <th class="px-3 py-2 whitescape-nowrap">Configuration</th>
                        <th class="px-3 py-2 whitescape-nowrap">UoM</th>
                        <th class="px-3 py-2 whitescape-nowrap">Satuan UoM</th>
                        <th class="px-3 py-2 whitescape-nowrap">Karton</th>
                        <th class="px-3 py-2 whitescape-nowrap">Barcode</th>
                        <th class="px-3 py-2 whitescpae-nowrap">Discount</th>
                        <th class="px-3 py-2 whitescpae-nowrap">Actions</th>
                    </tr>
                </thead>
                <tbody v-if="!isLoading">
                    <tr v-for="(p, i) in dataProduct" :key="i" class="border-b border-neutral-200 hover:bg-neutral-50">
                        <td class="px-3 py-2 whitescpae-nowrap">{{ i + 1 }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap">{{ p.name }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap">{{ p.brand.name }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap">{{ p.configuration.configuration }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap">{{ p.uom.name }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap">{{ formatRupiah(p.satuan_uom) }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap">{{ formatRupiah(p.karton) }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap">{{ p.barcode }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap">{{ p.discount1 }}%</td>
                        <td class="px-3 py-2 whitescpae-nowrap">
                            <div class="gap-2 flex">
                                <button @click="isConfirmDelete(p.id)"
                                    class="bg-red-500 p-1 rounded text-white cursor-pointer">
                                    <Trash2 :size="20" />
                                </button>
                                <routerLink :to="`/product/edit?id=${p.id}`"
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
        </section>
        <div class="flex items-center gap-1 mt-4 flex-wrap">
            <button v-for="(link, i) in links" :key="i" :disabled="!link.url" v-html="link.label"
                @click="getProduct(getPage(link.url))" class="
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