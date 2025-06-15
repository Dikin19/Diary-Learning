import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiary } from "../store/ProductSlice";
import Navbar from "../Components/Navbar/Navbar";
import { motion, useInView } from "framer-motion";
import CircularText from "../Components/Reactbits/CircularText/CircularText";
import DiaryCard from "../Components/DiaryFeed/DiaryCard";
import SplitText from "../Components/Reactbits/SplitText/SplitText";
import AnimatedContent from "../Components/Reactbits/AnimatedContent/AnimatedContent";


export default function DiaryFeed() {
    const ref = useRef(null); // Menyimpan referensi ke elemen HTML agar bisa dilacak posisinya
    const isInView = useInView(ref, { once: true }); // Mengecek apakah elemen ref sudah tampil di layar satu kali

    const dispatch = useDispatch(); // useDispatch() memberikan kita fungsi dispatch yang bisa kita gunakan untuk menjalankan action atau async thunk manual seperti (fungsi async seperti fetchDiary()).
    const diaries = useSelector((state) => state.product.items);
    const isLoading = useSelector((state) => state.product.isLoading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        dispatch(fetchDiary());
    }, [dispatch]);

    const diaryItems = diaries?.content || [];

    const cardVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
    };

    if (isLoading)
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
                <CircularText
                    text="WAIT * FOR LOADING * CONNECTION * "
                    onHover="speedUp"
                    spinDuration={50}
                    className="absolute mt-4 ml-4"
                    color="#A78BFA"
                />
            </div>
        );

    if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

    return (
        <div
            ref={ref}
            className="min-h-screen overflow-x-hidden bg-[#FFF7ED] relative text-[#3E2C23] px-4 md:px-20" // default mobile
        >


            <Navbar />

            <section className="py-12 pt-24" // py 12x4 = atas bawah dan pt 24x4 = atas 
            >

                <div className="flex justify-center items-center mt-5 mb-10">
                    <SplitText
                        text="Welcome to Our Diaries Enjoy Your Time Here"
                        className="text-2xl text-black font-semibold text-start"
                        delay={50}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        threshold={0.2}
                        rootMargin="-50px"
                    />
                </div>


                <AnimatedContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" // tablet dan desktop
                    >
                        {
                            diaryItems.length === 0 && (
                                <p className="col-span-full text-center text-[#3E2C23]">
                                    No diaries found.
                                </p>
                            )
                        }

                        {diaryItems.map((diary, index) => (
                            <motion.div
                                key={diary.id}
                                variants={cardVariants}
                                initial="initial"
                                animate={isInView ? "animate" : "initial"} // jika ref sudah terdeteksi dibrowser motion akan dijalankan
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >

                                <DiaryCard
                                    id={diary.id}
                                    title={diary.meta.title}
                                    description={diary.meta.description}
                                    imgUrl={diary.meta.image}
                                    created_dt={diary.created_dt}
                                    meta={diary.meta}
                                />
                            </motion.div>
                        ))}
                    </div>
                </AnimatedContent>
            </section>
        </div>
    );
}


// schema berjalanya data
/*
+---------------------+
| Komponen dimuat     |   <- React component tampil (render)
+---------------------+
            |
            v
+---------------------------+
| useEffect dijalankan     |   <- Hook dipicu saat render pertama
+---------------------------+
            |
            v
+-------------------------------------+
| dispatch(fetchDiary()) dipanggil   |   <- Kirim action async ke Redux
+-------------------------------------+
            |
            v
+-------------------------------+
| fetchDiary() dieksekusi      |   <- Fungsi async thunk
+-------------------------------+
            |
            v
+---------------------------------------+
| dispatch(fetchDiariesStart())        |  <- Nyalakan loading
+---------------------------------------+
            |
            v
+--------------------------------------+
| getDiaryFeed() dipanggil            |  <- Ambil data dari API
+--------------------------------------+
            |
            v
         +---------------------+
         | Server API Response |
         +---------------------+
           /              \
          /                \
  +----------------+   +-------------------------+
  | ✅ Sukses      |   | ❌ Gagal                |
  +----------------+   +-------------------------+
         |                      |
         v                      v
+---------------------+  +------------------------------+
| dispatch(fetchDiaries)|  | dispatch(fetchDiariesFailure)|
+---------------------+  +------------------------------+
         |                      |
         v                      v
+----------------------------------+
| Redux state di-update            |
| - items = hasil API              |
| - isLoading = false              |
| - error = null / error message   |
+----------------------------------+
         |
         v
+------------------------------------+
| Komponen membaca data dari Redux   |
| useSelector(state => state.items)  |
+------------------------------------+
         |
         v
+----------------------------+
| Tampilkan data ke layar   |
+----------------------------+

*/

// <div ref={ref} className="min-h-screen overflow-x-hidden bg-[#FFF7ED] relative text-[#3E2C23] px-4 md:px-20" // default mobile
/*
min-h-screen = Tinggi minimal sebesar tinggi layar penuh (100vh)
overflow-x-hidden = Cegah scroll horizontal dan konten yang meluap ke samping
px-4 = Padding kiri-kanan 16px untuk mobile/screen kecil
md:px-20 = Padding kiri-kanan 80px untuk layar sedang/besar
*/

//  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" // tablet dan desktop
/*
Class	          Fungsi	                                                Penjelasan
grid            = display: grid;                                          = Mengubah elemen <div> menjadi CSS Grid Container
md:grid-cols-2  = 2 kolom saat ukuran layar minimal 768px (ukuran tablet) =	Gunakan 2 kolom saat layar lebih lebar dari md
lg:grid-cols-3	= 3 kolom saat ukuran layar minimal 1024px (desktop)      = Gunakan 3 kolom saat layar lebih lebar dari lg
py-12           = Padding Y = 3rem (48px)	                              = Menambahkan padding atas dan bawah secara simetris
pt-24	        = Padding Top = 6rem (96px)	                              = Menimpa padding atas dari py-12 hanya untuk bagian atas
*/