import { Link } from "react-router";

export const Button = ({ diary }) => {

    const formattedDate = diary?.created_dt
        ? new Date(diary.created_dt).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }) // jika created_dt = "2025-06-12T14:00:00Z" => Thu Jun 12 2025 21:00:00 GMT+0700 (WIB) instance date
        : 'Tanggal tidak tersedia';

    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(diary.meta.title)}%20app%20logo?width=500&height=500&nologo=true`;

    return (

        <div className="mt-20 mb-5 px-4 flex justify-between items-center" // menjadikan posisi pojok kiri dan kanan
        >

            <div className="flex items-center space-x-3" // memberi space antara logo dan date 12px
            >

                <div className="w-8 h-8 rounded-full overflow-hidden" // jika gambar berlebihan akan dipotong agar tidak tumpah/over.
                >
                    <img
                        src={pollinationsUrl}
                        alt="Wisata App Logo"
                        className="w-8 h-8 object-cover" // gambar mengisi area dengan crop rapi
                    />
                </div>

                <div className="text-sm text-gray-700">
                    <span className="font-semibold">Wisata Diary</span> · {formattedDate}
                </div>

            </div>

            <Link
                to="/"
                className="inline-block px-5 py-2 rounded-md shadow-md text-white transition duration-200"
                style={{ backgroundColor: "#A78BFA" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7C3AED")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#A78BFA")}
            >
                ← Back to Home
            </Link>

        </div>

    )
}


// toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', })
/*
.toLocaleDateString() adalah method dari Date yang memformat tanggal sesuai lokalisasi bahasa.
'id-ID' menandakan lokalisasi Indonesia.
Opsi:
year: 'numeric' → tampilkan tahun penuh, misalnya: 2025
month: 'long' → nama bulan panjang: Juni
day: 'numeric' → tanggal: 12
Hasil akhirnya: 12 Juni 2025
*/

//<div className="mt-20 mb-5 px-4 flex justify-between items-center">
/*
mt-20	        Margin atas besar (jarak dari atas ke konten ini)
mb-5	        Margin bawah
px-4	        Padding kiri-kanan 1rem
flex	        Susun anak-anaknya horizontal
justify-between	Ruang kosong maksimal antara sisi kiri dan kanan
items-center	Pusatkan vertikal (agar logo dan teks sejajar)
*/

//className="inline-block px-5 py-2 rounded-md shadow-md text-white transition duration-200"
/*
Class	                    Fungsi
inline-block	            Supaya tombol bisa diberi padding
px-5 py-2	                Padding horizontal & vertikal
rounded-md	                Ujung tombol sedikit membulat
shadow-md	                Tambahkan bayangan
text-white	                Teks putih
transition duration-200	    Efek perubahan warna 0.2 detik
*/

