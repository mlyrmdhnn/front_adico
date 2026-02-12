<template>
    <div class="min-h-screen flex items-center justify-center bg-neutral-100">
        <div class="text-center bg-white p-8 rounded-2xl shadow-lg w-[420px]">
            <h1 class="text-6xl font-bold text-neutral-800">403</h1>

            <p class="mt-4 text-lg font-semibold text-neutral-700">
                Access Denied
            </p>

            <p class="mt-2 text-sm text-neutral-500 leading-relaxed">
                You do not have permission to access this page.
                Please contact an administrator if you believe this is a mistake.
            </p>

            <div class="mt-8 flex justify-center gap-3">
                <button @click="$router.back()"
                    class="px-4 py-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 text-sm font-medium transition">
                    Go Back
                </button>

                <!-- <router-link to="/dashboard"
                    class="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition">
                    Go to Dashboard
                </router-link> -->
            </div>
        </div>
    </div>
</template>