<script setup lang="ts">
import { Trash2, UserRoundPlus } from 'lucide-vue-next'
import Main from '@/layouts/Main.vue'
import { useSalesman } from '@/composables/salesman/useSalesman'
import SalesmanSkeleton from '@/components/skeleton/salesmanSkeleton.vue'
import Delete from '@/components/alert/Delete.vue'
import useSupervisor from '@/composables/useSupervisor'
const { getSuperVisor,
    isLoadingGetSupervisor,
    dataSupervisor,
    showDeleteSupervisor,
    selectedIdDelete,
    deleteSupervisor
} = useSupervisor()

const {
    showConfirmDelete,
} = useSalesman()

getSuperVisor()

const selectIdSupervisor = (id: number) => {
    selectedIdDelete.value = id
    showDeleteSupervisor.value = true
}

const confirmDelete = async () => {
    await deleteSupervisor()
    await getSuperVisor()
}
</script>

<template>
    <Delete v-if="showDeleteSupervisor" @cancel="showDeleteSupervisor = false" @confirm="confirmDelete" />

    <Main>
        <!-- HEADER + ACTION -->
        <section class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <h1 class="text-base font-semibold text-slate-800">
                    Data Supervisor
                </h1>

                <router-link to="/supervisor-create" class="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2
                           text-sm font-medium text-white
                           hover:bg-green-700 active:scale-95 transition">
                    <UserRoundPlus class="h-4 w-4" />
                    Tambah
                </router-link>
            </div>
        </section>

        <!-- LIST SALESMAN -->
        <section class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <template v-if="isLoadingGetSupervisor">
                <SalesmanSkeleton />
            </template>

            <template v-else>
                <div v-for="(d, i) in dataSupervisor" :key="i" class="rounded-xl border border-slate-200 bg-white p-4
                           transition hover:shadow-md">
                    <!-- CARD HEADER -->
                    <div class="mb-3 flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-slate-800">
                                {{ d.name }}
                            </p>
                            <p class="text-xs text-slate-500">
                                {{ d.code }}
                            </p>
                        </div>

                        <button @click="selectIdSupervisor(d.id)" class="rounded-lg p-2 text-red-500
                                   hover:bg-red-50 transition">
                            <Trash2 class="h-4 w-4" />
                        </button>
                    </div>

                    <!-- CARD BODY -->
                    <div class="space-y-1 text-sm">
                        <div class="flex justify-between text-slate-600">
                            <span>Nama</span>
                            <span class="font-medium text-slate-800">
                                Salesman {{ d.name }}
                            </span>
                        </div>

                        <div class="flex justify-between text-slate-600">
                            <span>Phone</span>
                            <span class="font-medium text-slate-800">
                                {{ d.phone }}
                            </span>
                        </div>
                    </div>
                </div>
            </template>
        </section>
    </Main>
</template>
