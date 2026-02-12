<script setup lang="ts">
import Main from '@/layouts/Main.vue'
</script>

<template>
    <Main>
        <!-- HEADER -->
        <div class="bg-white rounded shadow-md p-4 mb-4">
            <header>
                <h1 class="text-2xl font-semibold">Panduan Pengguna (Manager & Supervisor)</h1>
                <p class="text-sm text-gray-600 mt-1">
                    Panduan ini membantu Manager memahami alur kerja dan penggunaan fitur aplikasi
                    dalam mengelola aktivitas penjualan, absensi, dan laporan.
                </p>
                <p class="text-sm text-gray-600 mt-1">
                    ok
                </p>
            </header>
        </div>

        <section class="bg-white rounded p-6 space-y-8">
            <!-- TUJUAN APLIKASI -->
            <section>
                <h2 class="text-lg font-medium">1. Tujuan Aplikasi</h2>
                <p class="text-sm text-gray-700 mt-2">
                    Aplikasi ini digunakan untuk merekap seluruh aktivitas bisnis secara otomatis,
                    mulai dari aktivitas salesman di lapangan hingga laporan omset dan absensi,
                    sehingga proses pencatatan tidak lagi dilakukan secara manual.
                </p>
            </section>

            <!-- ROLE & AKSES -->
            <section>
                <h2 class="text-lg font-medium">2. Role dan Hak Akses</h2>
                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>
                        <strong>Manager</strong>:
                        Pengambil keputusan utama (approve / reject request, kelola target, absensi, produk, user).
                    </li>
                    <li>
                        <strong>Supervisor</strong>:
                        Membantu manager dalam rekap absensi dan approval, namun tidak dapat membuat supervisor baru.
                    </li>
                    <li>
                        <strong>Salesman</strong>:
                        Melakukan input aktivitas penjualan dan membuat request kepada manager.
                    </li>
                </ul>
            </section>

            <!-- ALUR KERJA UTAMA -->
            <section>
                <h2 class="text-lg font-medium">3. Alur Kerja Utama</h2>
                <ol class="list-decimal ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Salesman mendatangi toko / customer dan mencatat kebutuhan barang.</li>
                    <li>
                        Sistem menerapkan dua jenis diskon:
                        <ul class="list-disc ml-6 mt-1">
                            <li>Diskon 1: Diskon produk yang ditentukan oleh Manager.</li>
                            <li>Diskon 2: Diskon khusus untuk customer tertentu.</li>
                        </ul>
                    </li>
                    <li>Salesman mengirimkan request ke sistem.</li>
                    <li>
                        Request memiliki tiga status:
                        <strong>Pending</strong>, <strong>Approved</strong>, dan <strong>Rejected</strong>.
                    </li>
                    <li>
                        Request hanya dapat diexport ke PDF jika
                        <strong>Supervisor dan Manager sama-sama menyetujui</strong>.
                    </li>
                </ol>
            </section>

            <!-- DASHBOARD -->
            <section>
                <h2 class="text-lg font-medium">4. Dashboard</h2>
                <p class="text-sm text-gray-700 mt-2">
                    Dashboard menampilkan ringkasan kondisi bisnis secara real-time.
                </p>
                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Chart Candle: Laporan tahunan (total omset dan target).</li>
                    <li>Chart Pie: Laporan omset bulanan.</li>
                    <li>Daftar absensi salesman hari ini.</li>
                    <li>Pengaturan target dan hari kerja salesman.</li>
                    <li>Melihat dan mengedit absensi pada tanggal tertentu.</li>
                </ul>
            </section>

            <!-- INBOX -->
            <section>
                <h2 class="text-lg font-medium">5. Inbox Request</h2>
                <p class="text-sm text-gray-700 mt-2">
                    Menu Inbox berisi seluruh request dari salesman yang ditampilkan
                    dalam bentuk daftar (10 data per halaman).
                </p>

                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Melihat detail request dan catatan dari salesman.</li>
                    <li>Approve atau reject request.</li>
                    <li>Sinkronisasi request tanpa reload halaman.</li>
                </ul>

                <p class="text-sm text-gray-700 mt-2">
                    <strong>Catatan:</strong>
                    Jika Supervisor menolak namun Manager menyetujui, maka status akhir tetap Approved.
                    Namun jika Manager menolak, maka request tetap Rejected.
                </p>
            </section>

            <!-- PRODUCT -->
            <section>
                <h2 class="text-lg font-medium">6. Product</h2>
                <p class="text-sm text-gray-700 mt-2">
                    Menu Product digunakan untuk mengelola data produk dan diskon.
                </p>

                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Edit dan hapus produk.</li>
                    <li>Mengatur diskon produk secara individual.</li>
                    <li>Pencarian dan pagination data produk.</li>
                </ul>
            </section>

            <!-- MANAGE PRODUCT -->
            <section>
                <h2 class="text-lg font-medium">7. Manage Product</h2>
                <p class="text-sm text-gray-700 mt-2">
                    Digunakan untuk pengelolaan data master.
                </p>

                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Menambah product, brand, UOM, dan configuration.</li>
                    <li>Mengatur diskon global (Diskon 1).</li>
                </ul>
            </section>

            <!-- SALESMAN & SUPERVISOR -->
            <section>
                <h2 class="text-lg font-medium">8. Salesman & Supervisor</h2>
                <p class="text-sm text-gray-700 mt-2">
                    Manager dapat mengelola data user melalui menu ini.
                </p>

                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Membuat dan menghapus salesman.</li>
                    <li>Mengatur target omset dan hari kerja.</li>
                    <li>Membuat dan menghapus supervisor (khusus manager).</li>
                </ul>
            </section>

            <!-- STORE & CUSTOMER -->
            <section>
                <h2 class="text-lg font-medium">9. Store & Customer</h2>
                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Melihat dan mengelola daftar toko.</li>
                    <li>Melihat data customer (saat ini hanya view).</li>
                </ul>
            </section>

            <!-- DEVELOPER SUPPORT -->
            <section>
                <h2 class="text-lg font-medium">10. Developer Support</h2>
                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Hubungi Developer jika menemukan bug atau kendala teknis.</li>
                    <li>Bukan untuk pertanyaan operasional bisnis.</li>
                </ul>
            </section>

            <!-- NOTIFICATION -->
            <section>
                <h2 class="text-lg font-medium">11. Notification</h2>
                <ul class="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    <li>Mengirim notifikasi terhadap semua salesman</li>
                    <li>Manager dan supervisor bisa membuatnya</li>
                    <li>Global notifikasi untuk mengirim notifikasi kepada seluruh salesman</li>
                    <li>Bisa juga mengirim notifikasi khusus atau bersifat personal pada salesman</li>
                </ul>
            </section>

        </section>
    </Main>
</template>