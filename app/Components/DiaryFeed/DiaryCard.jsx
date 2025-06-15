import { EyeIcon } from "@heroicons/react/24/outline";
import { Button } from "../DiaryFeed/Button";

export default function DiaryCard({ id, title, description, imgUrl, created_dt, meta }) {
    const diary = { created_dt, meta, id };

    return (

        <div>

            <div>
                <Button diary={diary} />
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg shadow-slate-200 bg-white h-[400px] transition-transform hover:scale-[1.02] group">

                <div
                    className="relative h-52 md:h-56 bg-cover bg-center"
                    style={{ backgroundImage: `url(${imgUrl})` }}
                >

                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                        <a
                            href={`/diary/${id}`}
                            className="h-12 w-12 flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white transition duration-300 shadow-md"
                        >
                            <EyeIcon className="h-6 w-6 text-white" />
                        </a>
                    </div>

                </div>

                <div className="p-4 text-[#3E2C23]">
                    <h5 className="text-xl font-semibold mb-2 text-[#A78BFA]">{title}</h5>
                    <p className="text-sm line-clamp-3">{description}</p>
                </div>

            </div>

        </div>
    );
}


// useRef and useInview
/*
🔵 Komponen React dimount
↓
🧷 Membuat ref:
ref = useRef(null) // useRef adalah hook dari React yang digunakan untuk membuat referensi ke elemen DOM (seperti div, img, dll).
↓
📌 Ref ini ditempelkan ke elemen div:
<div ref={ref}>...</div>
↓
🧐 Framer Motion memantau elemen ref
(useInView memeriksa apakah div ini terlihat di layar)
↓
✅ Kalau div masuk ke layar:
isInView = true
↓
🏃 Maka animasi dijalankan:
animate = isInView ? "animate" : "initial"

useInView berasal dari library Framer Motion, digunakan untuk mengecek apakah elemen ref sedang terlihat di layar (viewport) atau belum.
🔹 once: true artinya: sekali elemen terlihat, maka isInView akan menjadi true dan tidak akan berubah lagi meskipun elemen itu keluar dari layar.
*/

// <div className="rounded-xl overflow-hidden shadow-lg shadow-slate-200 bg-white h-[400px] transition-transform hover:scale-[1.02] group">
/*
rounded-xl:         Memberikan sudut elemen yang membulat (ekstra besar).
overflow-hidden:    Memotong konten yang keluar dari batas elemen.
shadow-lg:          Memberikan bayangan besar.
shadow-slate-200:   Warna bayangan abu terang dari palet Tailwind.
bg-white:           Latar belakang putih.
h-[400px]:          Tinggi tetap sebesar 400px.
group:              Mengelompokkan elemen untuk interaksi hover bersama.
transition-transform: Aktifkan transisi untuk properti transform.
hover:scale-[1.02]: Saat di-hover, elemen membesar 102%.
*/

// <div className="relative h-52 md:h-56 bg-cover bg-center">
/*
- relative     → Posisi relatif untuk anak dengan posisi absolut.
- h-52         → Tinggi default 208px.
- md:h-56      → Tinggi jadi 224px saat layar medium (tablet).
- bg-cover     → Gambar latar memenuhi seluruh elemen.
- bg-center    → Gambar latar diposisikan di tengah.
*/

// <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
/*
absolute:       Elemen menempel penuh ke parent yang relative.
inset-0:        Semua sisi (top, right, bottom, left) = 0 → memenuhi parent.
bg-opacity-0:   Latar awalnya transparan.
group-hover:bg-opacity-60:          Saat parent di-hover, latar jadi gelap 60%.
transition-all duration-300:        Animasi halus 300ms.
flex items-center justify-center:   Konten berada di tengah elemen.
*/

// className="h-12 w-12 flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white transition duration-300 shadow-md">
/*
h-12 w-12:                          Tombol ini berukuran 48x48 px (12 x 4px).
flex items-center justify-center:   Konten (ikon mata) akan berada di tengah tombol.
rounded-full:                       Membuat tombol ini bulat.
border border-white/30:             Ada border tipis berwarna putih transparan 30%.
bg-white/10:                        Latar putih transparan 10% (efek seperti kaca).
backdrop-blur-sm:                   Membuat efek blur di belakang tombol (mirip efek kaca iOS).
hover:bg-white/20:                  Saat di-hover, latar jadi sedikit lebih terang (20%).
hover:border-white:                 Saat di-hover, border jadi putih solid.
transition duration-300:            Semua perubahan tadi transisi selama 0.3 detik.
shadow-md:                          Ada sedikit bayangan di bawah tombol.
*/

// <EyeIcon className="h-6 w-6 text-white" />
/*
h-6        → Tinggi 24px
w-6        → Lebar 24px
text-white → Warna teks/ikon putih
*/

// <div className="p-4 text-[#3E2C23]">
/*
p-4             → Padding 1rem (16px) di semua sisi
text-[#3E2C23]  → Warna teks cokelat gelap (custom HEX)
*/

// <h5 className="text-xl font-semibold mb-2 text-[#A78BFA]">
/*
text-xl       → Ukuran teks besar (20px)
font-semibold → Ketebalan semi-bold
mb-2          → Margin bawah 0.5rem (8px)
text-[#A78BFA]→ Warna ungu terang (custom HEX)
untuk title
*/

// <p className="text-sm line-clamp-3">
/*
text-sm       → Ukuran teks kecil (14px)
line-clamp-3  → Potong teks setelah 3 baris (hanya menampilkan 3 baris dan sisanya disembunyikan)
description
*/