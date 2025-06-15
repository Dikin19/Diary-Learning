export const Footer = ({ diary }) => {

    const updatedDate = diary.created_dt;

    return (
        <footer className="mt-16 border-t pt-6 text-gray-600 text-sm italic flex flex-col md:flex-row md:justify-between md:items-center gap-4">

            <div>
                <small>
                    Terakhir diperbarui:{" "}
                    <time dateTime={updatedDate}>
                        {new Date(updatedDate).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                </small>
            </div>

            <div>
                <small>
                    Ditulis oleh :
                    <span className="font-medium"> Redaksi Wisata Diary </span>
                </small>
            </div>

            <div className="flex space-x-6">
                {["Twitter", "Instagram", "Facebook"].map((platform) => (
                    <a
                        key={platform}
                        href={`https://${platform.toLowerCase()}.com/yourprofile`} // <a href="https://instagram.com/yourprofile">Instagram</a>
                        className="hover:text-indigo-600 transition-colors"
                        aria-label={platform} // memperjelas link mau ke arah mana.
                    >
                        {platform}
                    </a>
                ))}
            </div>

            <div className="text-gray-400">
                <small> &copy; {new Date().getFullYear()} Wisata Diary. All rights reserved.</small>
            </div>

        </footer>
    );
};

//<footer className="mt-16 border-t pt-6 text-gray-600 text-sm italic flex flex-col md:flex-row md:justify-between md:items-center gap-4">
/*
KelasTailwind	    Arti
mt-16	            Margin atas besar (4rem)
border-t	        Tambahkan garis atas
pt-6	            Padding atas 1.5rem
text-gray-600	    Warna teks abu-abu
text-sm	            Ukuran teks kecil
italic	            Teks miring
flex flex-col	    Flexbox kolom (mobile)
md:flex-row	        Baris jika di layar sedang ke atas
md:justify-between	Jarak antar elemen
md:items-center	    Rata tengah vertikal (desktop)
gap-4	            Jarak antar item 1rem
*/

// Terakhir diperbarui: 1 Juni 2025
/*
updatedDate (contoh: "2025-06-01") diubah jadi "1 Juni 2025" pakai fungsi toLocaleDateString.
dateTime={updatedDate} untuk SEO & aksesibilitas.
*/

//  className="hover:text-indigo-600 transition-colors"
/*
Kelas Tailwind	        Fungsi
hover:text-indigo-600	Saat kursor diarahkan, ubah warna teks jadi biru-ungu (#5A67D8)
transition-colors	    Tambahkan animasi halus saat warna berubah
*/

//
/*
Bagian	                    Fungsi
updatedDate	                Menampilkan tanggal diary
toLocaleDateString	        Format tanggal Indonesia
author	                    Nama penulis
map([...])	                Tampilkan tautan sosial media
new Date().getFullYear()	Tahun otomatis untuk copyright
Tailwind	                Atur layout responsif dan styling modern
*/