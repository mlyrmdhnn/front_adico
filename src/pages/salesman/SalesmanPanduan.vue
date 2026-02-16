<script setup lang="ts">
import SalesmanButtonNav from '@/components/SalesmanButtonNav.vue';
import SalesmanLayout from '@/layouts/SalesmanLayout.vue'
</script>

<template>
    <SalesmanLayout>
        <SalesmanButtonNav class="mb-4" />
        <!-- HEADER -->
        <div class="bg-white rounded shadow-md p-4 mb-4">
            <header>
                <h1 class="text-2xl font-semibold">Panduan Pengguna (Salesman)</h1>
                <p class="text-sm text-gray-600 mt-1">
                    Panduan ini membantu Salesman memahami alur kerja, absensi, target,
                    serta penggunaan fitur aplikasi dalam aktivitas penjualan harian.
                </p>
            </header>
        </div>

        <section class="bg-white rounded p-6 space-y-8">

            <!-- TUJUAN APLIKASI -->
            <section>
                <h2 class="text-lg font-medium">1. Tujuan Aplikasi</h2>
                <p class="text-sm text-gray-700 mt-2">
                    Aplikasi ini digunakan untuk mencatat seluruh aktivitas Salesman di lapangan
                    secara terstruktur, mulai dari absensi, pembuatan toko dan customer,
                    hingga pengajuan request ke Manager.
                </p>
            </section>

            <!-- ABSENSI & TARGET -->
            <section>
                <h2 class="text-lg font-medium">2. Absensi & Target Bulanan</h2>
                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Salesman wajib mengisi absensi setiap hari melalui menu Report.</li>
                    <li>Absensi di atas jam <strong>08.00</strong> otomatis tercatat sebagai <strong>Telat</strong>.
                    </li>
                    <li>Status absensi ditentukan oleh sistem, bukan input manual.</li>
                    <li>Target omset bulanan ditampilkan di halaman Report sebagai acuan kerja.</li>
                </ul>
            </section>

            <!-- REPORT -->
            <section>
                <h2 class="text-lg font-medium">3. Report</h2>
                <p class="text-sm text-gray-700 mt-2">
                    Menu Report menampilkan ringkasan performa Salesman dalam satu bulan berjalan.
                </p>

                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Total target dan realisasi omset bulan ini.</li>
                    <li>Jumlah <strong>Store</strong> dan <strong>Customer</strong> yang dibuat bulan ini.</li>
                    <li>Export PDF data Store & Customer bulan berjalan.</li>
                    <li>Export PDF dengan <strong>custom range tanggal</strong>.</li>
                    <li>Tombol <strong>Export Bulan Ini</strong> untuk export sekaligus Store & Customer.</li>
                </ul>
            </section>

            <!-- NOTIFICATION -->
            <section>
                <h2 class="text-lg font-medium">4. Notification</h2>
                <p class="text-sm text-gray-700 mt-2">
                    Menu Notification berisi informasi dan arahan dari Manager dan Supervisor.
                </p>

                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>
                        <strong>Notifikasi Khusus</strong> (warna kuning):
                        ditujukan ke Salesman tertentu.
                    </li>
                    <li>
                        <strong>Notifikasi Global</strong> (warna biru):
                        diterima oleh seluruh Salesman.
                    </li>
                </ul>
            </section>

            <!-- REQUEST -->
            <section>
                <h2 class="text-lg font-medium">5. Request</h2>
                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Salesman membuat request ke Manager melalui menu ini.</li>
                    <li>Request berisi kebutuhan atau pengajuan terkait penjualan.</li>
                    <li>Status request: <strong>Pending</strong>, <strong>Approved</strong>, <strong>Rejected</strong>.
                    </li>
                </ul>
            </section>

            <!-- YOUR REQUEST -->
            <section>
                <h2 class="text-lg font-medium">6. Your Request</h2>
                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Melihat seluruh histori request yang pernah dibuat.</li>
                    <li>Melihat status dan catatan dari Manager atau Supervisor.</li>
                </ul>
            </section>

            <!-- STORE -->
            <section>
                <h2 class="text-lg font-medium">7. Store</h2>
                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Membuat data toko baru.</li>
                    <li>Meng-assign kepemilikan toko kepada customer terkait.</li>
                    <li>Data store akan masuk ke laporan bulanan.</li>
                </ul>
            </section>

            <!-- CUSTOMER -->
            <section>
                <h2 class="text-lg font-medium">8. Customer</h2>
                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Membuat data customer baru.</li>
                    <li>Customer dapat memiliki lebih dari satu store.</li>
                </ul>
            </section>

            <!-- DEVELOPER SUPPORT -->
            <section>
                <h2 class="text-lg font-medium">9. Developer Support</h2>
                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Hubungi Developer jika menemukan bug atau kendala teknis.</li>
                    <li>Bukan untuk pertanyaan operasional bisnis.</li>
                </ul>
            </section>

        </section>
    </SalesmanLayout>
</template>