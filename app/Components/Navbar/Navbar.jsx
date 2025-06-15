import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false); // akan menjadi true ketika tombol hamburger diklik.

    const buttons = [ // 4 tombol yang diarahkan kemenu
        { label: "Popular Diaries", stars: "⭐", color: "#A78BFA", hover: "#0EA5E9", to: "/diary/253782 " },
        { label: "Popular Diaries", stars: "⭐⭐", color: "#A78BFA", hover: "#EC4899", to: "/diary/296907  " },
        { label: "Popular Diaries", stars: "⭐⭐⭐", color: "#A78BFA", hover: "#F59E0B", to: "/diary/342240 " },
        { label: "Popular Diaries", stars: "⭐⭐⭐⭐", color: "#A78BFA", hover: "#7C3AED", to: "/diary/358317" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#FFF7ED] border-b border-[#E5E7EB] shadow-sm z-50">

            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

                <div className="flex items-center">
                    <img
                        src='/App.png'
                        alt="Wisata App Logo"
                        className="h-8 w-8 mr-3 rounded-full object-cover shadow-sm"
                    />
                    <span className="font-bold text-xl text-[#3E2C23] ml-1 mr-10">
                        WISATA APP
                    </span>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)} // md:hidden untuk tidak menampilkan toggle di layar medium ke atas
                    className="md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3E2C23]"
                    aria-label="Toggle menu"
                >
                    <svg
                        className="h-6 w-6 text-[#3E2C23]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isOpen ? ( // ketika button hamburger muncul di layar tablet FALSE ketika di klick true
                            <path // true
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12" // X
                            />
                        ) : ( // false
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16" // strip 3
                            />
                        )}
                    </svg>
                </button>

                <div
                    className={`flex-col md:flex-row md:flex md:items-center w-full md:w-auto md:gap-3 absolute md:static top-16 left-0 md:top-auto bg-[#FFF7ED] md:bg-transparent border-t border-[#E5E7EB] md:border-none shadow-md md:shadow-none transition-transform duration-300 ease-in-out ${isOpen ? "flex translate-y-0" : "hidden md:flex"

                        }`} // popular diaries
                >
                    {buttons.map(({ label, stars, color, hover, to }, idx) => (
                        <Link key={idx} to={to}>
                            <button
                                className="text-white px-4 py-1 text-sm rounded-lg shadow-md transition mb-2 md:mb-0"
                                style={{ backgroundColor: color }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = hover}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = color}
                            >
                                {label} <span>{stars}</span>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

// <nav className="fixed top-0 left-0 w-full bg-[#FFF7ED] border-b border-[#E5E7EB] shadow-sm z-50">
/*
fixed top-0 left-0: Navbar menempel di atas layar (sticky).
w-full:             Lebar penuh layar.
bg-[#FFF7ED]:       Warna background krem.
border-b:           Tambah garis bawah.
shadow-sm:          Tambah bayangan ringan.
z-50:               Di atas elemen lain.
*/

// <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
/*
max-w-6xl: Maksimal lebar kontainer.
mx-auto: Pusatkan secara horizontal.
px-6: Padding kiri-kanan.
flex items-center justify-between: Susun horizontal, rata kiri-kanan.
h-16: Tinggi 64px.
*/

// <svg className="h-6 w-6 text-[#3E2C23]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
/*
Properti	Fungsi
className	Atur ukuran dan warna ikon
xmlns	    Menentukan standar SVG XML
fill="none"	Hanya garis luar ikon yang terlihat, tidak ada isi warna
viewBox	    Area kerja internal SVG (24x24)
stroke	    Mengikuti warna text-color, agar bisa dikontrol via CSS
*/

// strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
/*
strokeLinecap="round"	Ujung garis dibulatkan
strokeLinejoin="round"	Sudut pertemuan garis dibulatkan
strokeWidth={2}	        Ketebalan garis = 2 (cukup tegas tapi tidak terlalu tebal)
*/

// className={`flex-col md:flex-row md:flex md:items-center w-full md:w-auto md:gap-3 absolute md:static top-16 left-0 md:top-auto bg-[#FFF7ED] md:bg-transparent border-t border-[#E5E7EB] md:border-none shadow-md md:shadow-none transition-transform duration-300 ease-in-out ${isOpen ? "flex translate-y-0" : "hidden md:flex"
/*
flex-col                Susun anak-anak secara vertikal (mobile)
md:flex-row	            Ubah jadi horizontal di layar medium ke atas
md:flex	                Tampilkan sebagai flex container di layar medium ke atas
md:items-center	        Rata tengah item di sumbu silang (Y axis, hanya di md ke atas)
w-full	                Lebar penuh (mobile)
md:w-auto	            Ukuran lebar otomatis di desktop
md:gap-3	            Jarak antar tombol di desktop (gap 3 = 0.75rem)
absolute	            Posisi mengambang di atas elemen lain (mobile)
md:static	            Ubah jadi posisi normal di desktop
top-16 left-0	        Posisi di bawah navbar, sisi kiri (mobile)
md:top-auto	            Hilangkan top positioning di desktop
bg-[#FFF7ED]	        Background warna krem terang (mobile)
md:bg-transparent	    Di desktop, background-nya bening
border-t border-[#E5E7EB]	Tambahkan garis batas atas (mobile)
md:border-none	        Hilangkan border di desktop
shadow-md	            Ada bayangan di bawah menu (mobile)
md:shadow-none	        Hilangkan bayangan di desktop
transition-transform duration-300 ease-in-out	        Animasi smooth ketika menu muncul / hilang
${isOpen ? ...}	                                        Menentukan apakah menu muncul atau tidak di mobile
*/

// ${isOpen ? "flex translate-y-0" : "hidden md:flex"
/*
isOpen === true:
➜ flex translate-y-0 → tampilkan menu (menu ditarik ke bawah)

isOpen === false:
➜ hidden md:flex → sembunyikan menu di mobile, tampilkan di desktop
*/

// className="text-white px-4 py-1 text-sm rounded-lg shadow-md transition mb-2 md:mb-0"
/*
Class           Function            penjelasan singkat
text-white	    Warna teks	        Warna teks jadi putih (misalnya: tulisan “Popular Diaries”)
px-4	        Padding horizontal	Padding kiri-kanan sebesar 1rem (16px), agar tombol tidak sempit
py-1	        Padding vertikal	Padding atas-bawah sebesar 0.25rem (4px), untuk tinggi tombol
text-sm	        Ukuran teks	        Ukuran teks kecil agar tombol ringkas
rounded-lg	    Sudut melengkung	Bikin ujung tombol melengkung agar terlihat modern
shadow-md	    Bayangan	        Menambahkan efek bayangan lembut agar tombol tampak terangkat dari layar
transition	    Animasi transisi	Mengaktifkan animasi halus saat terjadi perubahan, seperti warna saat hover
mb-2	        Margin bawah (mobile)	Jarak bawah 0.5rem (8px), memberi ruang antar tombol saat ditumpuk di layar kecil
md:mb-0	        Responsif margin (desktop)	Di layar medium ke atas, hilangkan margin bawah karena tombol sudah sejajar
*/