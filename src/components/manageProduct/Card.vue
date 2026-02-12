<script setup lang="ts">
import { useProduct } from '@/composables/product/useProduct';
const {
    brand,
    uom,
    configuration,
    isLoadingBrand,
    isLoadingUom,
    isLoadingConfiguration,
    discount1,
    isLoadingDiscount1,
    // createBrand,
    // createUom,
    // createConfiguration,
    createDiscount1,
    clickCreateBrand,
    clickCreateConfiguration,
    clickCreateUom
} = useProduct()


</script>
<template>
    <div class="border border-neutral-300 rounded-lg p-4 bg-white shadow-sm">
        <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-700">
                Brand
            </label>
            <div class="flex gap-2">
                <input v-model="brand" type="text" placeholder="Create Brand"
                    class="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
                <button @click="clickCreateBrand" type="button"
                    class="px-4 py-2 text-sm rounded-md bg-slate-700 text-white hover:bg-slate-800 transition">
                    {{ isLoadingBrand ? 'Processing...' : 'Create' }}
                </button>
            </div>
        </div>
    </div>
    <div class="border border-neutral-300 rounded-lg p-4 bg-white shadow-sm">
        <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-700">
                UoM
            </label>
            <div class="flex gap-2">
                <input v-model="uom" type="text" placeholder="Create UoM"
                    class="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
                <button @click="clickCreateUom" type="button"
                    class="px-4 py-2 text-sm rounded-md bg-slate-700 text-white hover:bg-slate-800 transition">
                    {{ isLoadingUom ? 'Processing...' : 'Create' }}
                </button>
            </div>
        </div>
    </div>
    <div class="border border-neutral-300 rounded-lg p-4 bg-white shadow-sm">
        <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-700">
                Configuration
            </label>
            <div class="flex gap-2">
                <input v-model="configuration" type="text" placeholder="Create Configuration"
                    class="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
                <button @click="clickCreateConfiguration" type="button"
                    class="px-4 py-2 text-sm rounded-md bg-slate-700 text-white hover:bg-slate-800 transition">
                    {{ isLoadingConfiguration ? 'Processing...' : 'Create' }}
                </button>
            </div>
        </div>
    </div>
    <div class="border border-neutral-300 rounded-lg p-4 bg-white shadow-sm">
        <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-700">
                Discount1
            </label>
            <div class="flex gap-2">
                <input v-model="discount1" type="text" placeholder="Create Brand"
                    class="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
                <button @click="createDiscount1" type="button"
                    class="px-4 py-2 text-sm rounded-md bg-slate-700 text-white hover:bg-slate-800 transition">
                    {{ isLoadingDiscount1 ? 'Processing...' : 'Create' }}
                </button>
            </div>
        </div>
    </div>
</template>