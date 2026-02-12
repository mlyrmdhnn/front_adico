<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import { useInbox } from '@/composables/useInbox';
import { onMounted, onUnmounted } from 'vue';
import { Trash2, Pencil, Eye } from 'lucide-vue-next';
const { getInbox, keyword, inboxData, isLoadingGet, links, intervalInboxPolling } = useInbox()

onMounted(async () => {
    await getInbox()
})
const getPage = (url: string) => {
    if (!url) return
    const params = new URL(url).searchParams
    return Number(params.get('page'))
}


</script>
<template>
    <Main>
        <section class="bg-white p-2 rounded mb-4">
            <input v-model="keyword" type="text" name="" id="" class="input" placeholder="Search Inbox">
        </section>
        <section class="mt-4 mb-4">
            <button class="bg-sky-500 rounded text-white p-2 cursor-pointer" @click="() => getInbox()">Sync</button>
        </section>
        <section class="bg-white rounded-md shadow-sm overflow-x-auto h-[515px]">
            <table class="min-w-[1200px] w-full border-collapse text-sm">
                <thead>
                    <tr class="text-left text-neutral-700">
                        <th class="px-3 py-2 whitescape-nowrap">No</th>
                        <th class="px-3 py-2 whitescape-nowrap">Salesman</th>
                        <th class="px-3 py-2 whitescape-nowrap">Salesman Code</th>
                        <th class="px-3 py-2 whitescape-nowrap">Store</th>
                        <th class="px-3 py-2 whitespace-nowrap">Address</th>
                        <th class="px-3 py-2 whitescape-nowrap">Status1</th>
                        <th class="px-3 py-2 whitescape-nowrap">Status2</th>
                        <th class="px-3 py-2 whitescape-nowrap">Actions</th>
                    </tr>
                </thead>
                <tbody v-if="!isLoadingGet">
                    <tr v-for="(p, i) in inboxData" :key="i" class="border-b border-neutral-200 hover:bg-neutral-50">
                        <td class="px-3 py-2 whitescpae-nowrap">{{ i + 1 }}</td>
                        <span :class="{
                            'bg-red-500 text-white rounded px-1': p.salesman.deleted_at
                        }">
                            {{ p.salesman.name }}
                        </span>

                        <td class="px-3 py-2 whitescpae-nowrap">{{ p.salesman.code }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap">{{ p.store.name }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap">{{ p.store.address }}</td>
                        <td class="px-3 py-2 whitescpae-nowrap"
                            :class="[p.status1 == 'rejected' ? 'text-red-500' : '', p.status1 == 'approved' ? 'text-green-500' : 'text-amber-500']">
                            {{
                                p.status1 }}
                        </td>
                        <td class="px-3 py-2 whitescpae-nowrap"
                            :class="[p.status2 == 'rejected' ? 'text-red-500' : '', p.status2 == 'approved' ? 'text-green-500' : 'text-amber-500']">
                            {{
                                p.status2 }}
                        </td>
                        <td class="px-3 py-2 whitescpae-nowrap">
                            <div class="gap-2 flex">
                                <!-- <button class="bg-red-500 p-1 rounded text-white cursor-pointer">
                                    <Trash2 :size="20" />
                                </button> -->
                                <routerLink :to="`/inbox/detail?id=${p.id}`"
                                    class="bg-sky-500 p-1 rounded text-white cursor-pointer">
                                    <Eye :size="20" />
                                </routerLink>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <div v-if="isLoadingGet"
                class="h-[450px] w-full flex justify-center items-center text-2xl text-slate-700 font-semibold">
                Loading...
            </div> -->
        </section>


        <div class="flex items-center gap-1 mt-4 flex-wrap">
            <button v-for="(link, i) in links" :key="i" :disabled="!link.url" v-html="link.label"
                @click="getInbox(getPage(link.url))" class="
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