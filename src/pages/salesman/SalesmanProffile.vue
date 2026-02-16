<script setup lang="ts">
import Main from '@/layouts/Main.vue';
import SalesmanLayout from '@/layouts/SalesmanLayout.vue';
import { useAuth } from '@/composables/useAuth';
import { onMounted } from 'vue';
const { getMe, userData, changeProffile, changePassword, formChangePass } = useAuth()

onMounted(async () => {
    await getMe()
})

</script>
<template>
    <SalesmanLayout>
        <section class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-slate-800 mb-4">
                Profile Information
            </h2>

            <form @submit.prevent="changeProffile" class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <!-- LEFT -->
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">Username</label>
                        <input type="text" disabled :value="(userData as any)?.username" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                               text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1B211A]/30" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">Name</label>
                        <input v-model="(userData as any).name" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                               focus:outline-none focus:ring-2 focus:ring-[#1B211A]/30" />
                    </div>
                </div>

                <!-- RIGHT -->
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">Phone</label>
                        <input v-model="(userData as any).phone" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                               focus:outline-none focus:ring-2 focus:ring-[#1B211A]/30" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">Role</label>
                        <input type="text" :value="(userData as any)?.role" disabled
                            class="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-500" />
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="bg-[#1B211A] text-white px-5 py-2 rounded-lg text-sm
                               hover:bg-[#141914] transition cursor-pointer">
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </section>


        <section class="bg-white rounded-xl border border-slate-200 p-6 mt-4 shadow-sm">
            <h2 class="text-lg font-semibold text-slate-800 mb-4">
                Change Password
            </h2>

            <form @submit.prevent="changePassword" class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">Current Password</label>
                        <input v-model="formChangePass.oldPass" type="password" class="input" placeholder="********" />
                    </div>

                    <div>
                        <label class="block text-sm text-slate-600 mb-1">New Password</label>
                        <input v-model="formChangePass.newPass" type="password" class="input"
                            placeholder="Enter your new password" />
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm text-slate-600 mb-1">Confirm Password</label>
                        <input v-model="formChangePass.confirmPass" type="password" class="input"
                            placeholder="Confirm your new password" />
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="bg-[#1B211A] text-white px-5 py-2 rounded-lg text-sm
                               hover:bg-[#141914] transition cursor-pointer">
                            Update Password
                        </button>
                    </div>
                </div>
            </form>
        </section>
    </SalesmanLayout>
</template>