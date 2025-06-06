# Guidelines
1. This repository contains several tasks related to your main objective: building a website.
Each task will be clearly marked in the code as: `TASK: task description`.

2. Place all of your website code in the `/app` directory.

3. Do not move, modify, or delete any code within the `/api` and `/utils` directories.

4. You are required to use the exported modules from `/api` and `/utils` to complete their respective tasks.

# Submission
You may put any documentation or notes related to your submission here


Selama proses pengerjaan fitur render konten MDX pada project ini, saya mengalami beberapa kendala dan melakukan pendekatan alternatif untuk menyelesaikan masalah tersebut. Berikut ini adalah catatan yang menjelaskan proses dan solusi yang saya tempuh:

⚠️ 1. Kendala: MDX Runtime di Backend Pure JavaScript :
- Saya semula berencana untuk merender konten .mdx secara dinamis di backend menggunakan runtime.
- Namun, pendekatan MDX Runtime seperti @mdx-js/runtime atau next-mdx-remote umumnya memerlukan lingkungan React atau Next.js, dan tidak dapat dijalankan secara langsung di backend JavaScript murni (Node.js tanpa bundler).
- Upaya menggunakan @mdx-js/mdx berhasil mengkompilasi MDX menjadi JSX, tetapi tetap membutuhkan evaluasi React runtime untuk dapat dirender menjadi HTML, yang tidak tersedia di backend murni.
- Hal ini membuat pendekatan runtime MDX secara penuh di backend tidak feasible untuk kebutuhan saya saat ini.

✅ 2. Solusi: Parsing Markdown Manual & Render UI Block 
Sebagai alternatif dari MDX runtime, saya membuat solusi dengan pendekatan berikut:

a. Fungsi parseToBlocks(markdown)
- Fungsi ini saya buat untuk mengubah konten string Markdown menjadi struktur data blok-blok.
- Setiap blok bisa berupa:
    - heading (misal #, ##)
    - paragraph
    - image (![]())
    - list (daftar bullet atau angka)
    - embed (untuk konten seperti YouTube, Instagram, dll — jika ditemukan URL-nya)
    - Tujuan utama adalah mempermudah frontend dalam merender konten sesuai jenis komponennya.

- Contoh output dari fungsi ini:
    [
  { type: 'heading', level: 1, content: 'Judul Utama' },
  { type: 'paragraph', content: 'Ini adalah paragraf biasa.' },
  { type: 'image', url: 'https://...' },
  { type: 'list', items: ['Item 1', 'Item 2'] }
    ]

b. Fungsi renderContent(blocks)
- Fungsi ini berjalan di frontend untuk menerima hasil dari parseToBlocks dan me-render-nya menjadi React Components.
- Setiap tipe blok akan di-render dengan komponen UI yang sesuai (contohnya: <h1>, <p>, <img>, <ul>, dsb).

🖼️ 3. Penggunaan getSizeOptimizedImageUrl :
- Untuk optimasi tampilan gambar, saya langsung memanggil fungsi getSizeOptimizedImageUrl saat memproses konten gambar.

- Fungsi ini bertugas untuk mengubah URL gambar menjadi format yang lebih optimal (misalnya, dengan parameter ukuran, CDN, dsb).

- Ini saya lakukan di dalam renderContent, agar gambar yang ditampilkan lebih cepat dimuat dan responsive di berbagai device.

🎯 4. Keuntungan dari Pendekatan Ini :
- Tidak bergantung pada runtime MDX atau React environment di backend.
- Konten bisa berasal dari berbagai sumber (CMS, API, Markdown file) dan tetap bisa ditampilkan secara dinamis.- Struktur blok terstruktur lebih mudah dikontrol di sisi frontend.
- Mendukung SEO, optimasi gambar, dan fleksibilitas render berdasarkan device.