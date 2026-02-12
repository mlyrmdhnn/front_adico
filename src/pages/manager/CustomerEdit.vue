<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import { useRoute } from 'vue-router';
import { useCustomer } from '@/composables/customer/useCustomer';
import { onMounted, ref } from 'vue';
import Multiselect from 'vue-multiselect';

// inisialisasi
const route = useRoute()
const { getCustomerDetail, dataCustomer, isLoading, formEditCustomer, selectedStore, getStore, dataStore } = useCustomer()
console.log(route.query.id)
onMounted(() => {
    getCustomerDetail(route.query.id)
    getStore()
})

// const stores = ref<any[]>([
//     {
//         store_id: null,
//     }
// ])

// const addRow = () => {
//     stores.value.push({
//         store_id: null
//     })
// }

const editCustomer = async () => {
    const payload = {
        name: formEditCustomer.value.name,
        phone: formEditCustomer.value.phone,
        npwp: formEditCustomer.value.npwp,
        store_ids: formEditCustomer.value.stores
            .filter(Boolean)
            .map(s => s.id),
    }

}

const addRow = () => {
    formEditCustomer.value.stores.push(null)
}

</script>
<template>
    <Main>
        <template v-if="!route.query.id || !route.query">
            Sorry we cant find that
        </template>
        <section class="bg-white rounded-md p-2 text-slate-700">
            Edit Customer
        </section>
        <section class="bg-slate-100 p-6 mt-4">
            <div class=" mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">
                <!-- Form -->
                <form @submit.prevent="" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Username -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Customer Name
                        </label>
                        <input v-model="formEditCustomer.name" type="text" placeholder="Customer name" class="input" />
                    </div>

                    <!-- Name -->
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Phone
                        </label>
                        <input v-model="formEditCustomer.phone" type="number" placeholder="08XXXXXXXXXX"
                            class="input" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">
                            Npwp
                        </label>
                        <input v-model="formEditCustomer.npwp" type="number" placeholder="NPWP" class="input" />
                    </div>

                    <!-- {{ formEditCustomer.stores  -->


                    <div v-for="(store, index) in formEditCustomer.stores" :key="index" class="col-span-2">
                        <label class="block text-sm text-slate-600 mb-1">
                            Store {{ index + 1 }}
                        </label>

                        <Multiselect v-model="formEditCustomer.stores[index]" :options="dataStore" track-by="id"
                            label="name" placeholder="Select store" />
                    </div>

                    <button type="button" @click="addRow">
                        Tambah Toko
                    </button>

                    <!-- Action -->
                    <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                        <button type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition cursor-pointer">
                            {{ isLoading ? 'Creating...' : 'Create Store' }}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </Main>
</template>