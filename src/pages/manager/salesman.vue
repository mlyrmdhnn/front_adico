<script setup lang="ts">
import { Trash2, UserRoundPlus } from 'lucide-vue-next'
import Main from '@/layouts/Main.vue'
import { useSalesman } from '@/composables/salesman/useSalesman'
import SalesmanSkeleton from '@/components/skeleton/salesmanSkeleton.vue'
import Delete from '@/components/alert/Delete.vue'

const {
    getSalesman,
    dataSalesman,
    isLoading,
    deleteSalesman,
    setSelectIdDelete,
    showConfirmDelete,
    hariKerjaVal,
    inputHariKerja,
    targetSalesman,
    inputSalesmanTarget,
    loadingSalesmanTarget
} = useSalesman()

getSalesman()

const confirmDelete = async () => {
    await deleteSalesman()
    await getSalesman()
}
</script>

<template>
    <Delete v-if="showConfirmDelete" @cancel="showConfirmDelete = false" @confirm="confirmDelete" />

    <Main>
        <!-- HEADER + ACTION -->
        <section class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <h1 class="text-base font-semibold text-slate-800">
                    Data Salesman
                </h1>

                <router-link to="/create-salesman" class="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2
                           text-sm font-medium text-white
                           hover:bg-green-700 active:scale-95 transition">
                    <UserRoundPlus class="h-4 w-4" />
                    Tambah
                </router-link>
            </div>

            <!-- INPUT HARI KERJA -->
            <div class="flex flex-wrap items-end gap-4">
                <div class="flex flex-col gap-1">
                    <label class="text-xs font-medium text-slate-600">
                        Hari kerja
                    </label>
                    <input v-model="hariKerjaVal" type="text" placeholder="Contoh: 22" class="w-52 rounded-lg border border-slate-300 px-3 py-2 text-sm
                               focus:outline-none focus:ring-2 focus:ring-slate-400/40
                               focus:border-slate-500" />
                </div>

                <button @click="inputHariKerja" class="h-[38px] rounded-lg bg-slate-800 px-5
                           text-sm font-medium text-white
                           hover:bg-slate-900 active:scale-95 transition">
                    {{ isLoading ? 'Loading...' : 'Simpan' }}
                </button>
            </div>

            <div class="flex flex-wrap items-end mt-4 gap-4">
                <div class="flex flex-col gap-1">
                    <label class="text-xs font-medium text-slate-600">
                        Target Salesman
                    </label>
                    <input v-model="targetSalesman" type="text" placeholder="Contoh: 22" class="w-52 rounded-lg border border-slate-300 px-3 py-2 text-sm
                               focus:outline-none focus:ring-2 focus:ring-slate-400/40
                               focus:border-slate-500" />
                </div>

                <button @click="inputSalesmanTarget" class="h-[38px] rounded-lg bg-slate-800 px-5
                           text-sm font-medium text-white
                           hover:bg-slate-900 active:scale-95 transition">
                    {{ loadingSalesmanTarget ? 'Loading...' : 'Simpan' }}
                </button>
            </div>
        </section>

        <!-- LIST SALESMAN -->
        <section class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <template v-if="isLoading">
                <SalesmanSkeleton />
            </template>

            <template v-else>
                <div v-for="(d, i) in dataSalesman" :key="i" class="rounded-xl border border-slate-200 bg-white p-4
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

                        <button @click="setSelectIdDelete(d.id)" class="rounded-lg p-2 text-red-500
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
                        <div class="flex justify-between text-slate-600">
                            <span>Hari Kerja</span>
                            <span class="font-medium text-slate-800">
                                <span v-if="(d as any).hari_kerja[0]">
                                    {{ (d as any).hari_kerja[0].day }}
                                </span>
                                <span v-else>
                                    Total hari kerja belum ditentukan
                                </span>
                            </span>
                        </div>

                    </div>
                </div>
            </template>
        </section>
    </Main>
</template>
