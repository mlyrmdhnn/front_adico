<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/composables/useStore';
import { onMounted } from 'vue';
const route = useRoute()
const { getDetail, formEdit, isLoadingUpdate, updateStore } = useStore()
// console.log(route.query.id)
onMounted(() => {
    getDetail(route.query.id)
})
</script>
<template>
    <Main>
        <section class="bg-slate-100 p-6">
            <div class="mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">

                <!-- Header -->
                <div class="mb-6">
                    <h1 class="text-xl font-semibold text-slate-800">
                        Edit Store
                    </h1>
                    <p class="text-sm text-slate-500">
                        Perbarui informasi toko
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="updateStore" class="grid grid-cols-1 gap-5">

                    <!-- Store Name -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Store Name
                        </label>
                        <input v-model="formEdit.name" type="text" placeholder="Store name" class="input" />
                    </div>

                    <!-- Address -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Address
                        </label>
                        <textarea v-model="formEdit.address" rows="3" placeholder="Store address"
                            class="input resize-none" />
                    </div>

                    <!-- Action -->
                    <div class="flex justify-end gap-3 pt-4">
                        <button type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                       bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                            {{ isLoadingUpdate ? 'Updating...' : 'Update Store' }}
                        </button>
                    </div>

                </form>
            </div>
        </section>
    </Main>
</template>