import { parseToBlocks } from "../app/Components/CmsUtils/Parse";


  const CDN_WISATA_URL = 'https://cdn.wisata.app'
  const CDN_TWITTER_URL = 'https://pbs.twimg.com'
  const CDN_WISATA_IMG_SIZE = {
    TH: 'th',
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
  }

  /**
   * TASK: Find available image size for Twitter CDN
   */
  const CDN_TWITTER_IMG_SIZE = {
    THUMB: 'thumb',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
  };

  // const App = () => {
  //   console.log('Twitter Large Image Size:', CDN_TWITTER_IMG_SIZE.LARGE);
  //   return 'Hello';
  // }

  // const result = App();
  // console.log('App Return:', result);

  /**
   * TASK: Replace original image URL with size-optimized image URL.
   * @example
   * For Wisata CDN URL:
   * ```
   * https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg
   * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_th.jpg
   * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_lg.jpg
   * ```
   *
   * Note that some images may not have optimized URL variants.
   */
  // utils/imageUtils.js

export function getSizeOptimizedImageUrl(url, size) { // Mengubah URL gambar agar lebih kecil/cepat dimuat sesuai require 
  // console.log('data dari url and size :',url, '/n', size);
  const CDN_WISATA_URL = 'https://cdn.wisata.app'; // hanya proses url ini.
  const CDN_WISATA_IMG_SIZE = {
    TH: 'th',
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
  };

  if (
    typeof url !== 'string' || // lolos jika url adalah str berarti condition false
    !url.startsWith(CDN_WISATA_URL) || // jika bukan domain cdn wisata kembalikan
    !url.match(/\.(jpe?g|png|webp)$/i)
  ) {
    return url;
  }

  /*  
  Pengecekan ini akan mengembalikan URL asli jika:

  url bukan string → ❌ bukan URL

  url tidak berasal dari https://cdn.wisata.app

  url tidak diakhiri dengan .jpg, .jpeg, .png, .webp
  */

  let sizeSuffix = CDN_WISATA_IMG_SIZE[size.toUpperCase()]; // md menjadi MD.
  // console.log('hasil dari sizeSuffix :', sizeSuffix);

  if (!sizeSuffix) { // jika size tidak ditemukan coba memakai manual dengan angka.
    const pxMatch = size.match(/^(\d+)x?$/);
    if (pxMatch) {
      sizeSuffix = pxMatch[1] + 'w';
    }
  }

  if (!sizeSuffix) return url;

  return url.replace(/(\.[a-z]+)$/i, `_${sizeSuffix}$1`);
}


  // const originalUrl = 'https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg';
  // const optimizedUrl = getSizeOptimizedImageUrl(originalUrl, 'lg');
  // console.log(optimizedUrl);

  // const url = 'https://cdn.wisata.app/diary/abc123.jpg';
  // const thumbUrl = getSizeOptimizedImageUrl(url, 'th');

  // console.log(thumbUrl);


/**
 * TASK: Extracts SEO attributes from diary content
 */
export function getDiaryContentSEOAttributes(contentData) { // Mengambil SEO (judul, deskripsi, gambar, dsb) dari diary.
  
  if (!contentData || typeof contentData !== 'object') {
    return {
      title: 'Untitled Diary',
      description: 'Baca artikel menarik di sini.',
      image: '',
      author: 'Redaksi',
      keywords: '',
      publishedTime: new Date().toISOString(), // format standar international ISO
    };
  }

  const meta = contentData.meta || {};

  const title = typeof meta.title === 'string' && meta.title.trim() ? meta.title : 'Untitled Diary';

  const description = typeof meta.description === 'string' && meta.description.trim() ? meta.description : 'Baca artikel menarik di sini.';

  const image = typeof meta.image === 'string' ? meta.image : '';
  
  const keywords = typeof meta.slug === 'string' ? meta.slug : '';

  return {
    title,
    description,
    image,
    author: 'Redaksi',
    keywords,
    publishedTime: contentData.created_dt || new Date().toISOString(),
  };
}

// trim() menghilangkan spasi diawal atau di akhir bukan ditengah

  // const diaryData = {
  //   meta: {
  //     title: "Illumi Singapore 2024: Transformasi Marina Bay",
  //     description: "Festival cahaya spektakuler dengan 20 juta lampu LED dan 9 dunia bertema.",
  //     image: "https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg",
  //     slug: "illumi-singapore-2024-marina-bay-20-juta-lampu-led",
  //   },
  //   created_dt: "2024-09-01T00:00:00+00:00",
  //   content: "...",
  // };


  // const seo = getDiaryContentSEOAttributes(diaryData);
  // console.log(seo);

/**
 * TASK: Convert diary content to renderable data
 * 
 * The content coming from `/cms/diary` is in MDX (Markdown with Embedded Components) format. This function help render that content.
 * 
 * Known MDX components are:
 * - \<YoutubeEmbed />
 * - \<InstagramEmbed />
 * - \<TiktokEmbed />
 * - \<TwitterEmbed />
 */



export function renderDiaryContent(diary) { // Fungsi yang mengubah isi diary jadi struktur blok (paragraf, gambar, embed).
  // console.log('procces rendered 1 :', diary)
  const rawContent = diary?.content
  // console.log('procces rendered 2 rawContent :', rawContent)

  const optimizedContent = rawContent.replace( // optimasi gambar cdn
    /!\[(.*?)\]\((https:\/\/cdn\.wisata\.app\/[^\s)]+)\)/g,
    (match, alt, url) => {
      const optimizedUrl = getSizeOptimizedImageUrl(url, "md");
      return `![${alt}](${optimizedUrl})`;
    }
  );

  //        alt                   url
  // alt, url = ![Pemandangan Indah](https://cdn.wisata.app/images/pemandangan1.jpg)
  // return   = ![Pemandangan Indah](https://cdn.wisata.app/images/pemandangan1.jpg?size=md)


  
  const contentBlocks = parseToBlocks(optimizedContent);
  // Siap dirender sebagai HTML di React
  // console.log('hasil dari parseToBlocks :', contentBlocks)

  return {
    contentBlocks,
  };
}




// /!\[(.*?)\]\((https:\/\/cdn\.wisata\.app\/[^\s)]+)\)/g, (optimazedContent)
/*
Bagian Regex	                          Artinya
// !\[	                                Mulai dari tanda ![ (Markdown image)
(.*?)	                                  Tangkap ALT TEXT (judul gambar)
\]	                                    Tutup ALT TEXT
\(	                                    Mulai URL gambar
(https:\/\/cdn\.wisata\.app\/[^\s)]+)	  Tangkap URL dari cdn.wisata.app
\)	                                    Tutup URL gambar
g	                                      Global, artinya cek semua gambar dalam teks, bukan cuma yang pertama
*/

// const pxMatch = size.match(/^(\d+)x?$/);
/*
Penjelasan:
Jika sizeSuffix masih kosong (artinya tidak ditemukan di list standar), maka kode ini coba cari ukuran manual.

Contoh: size = "300" atau "300x"
Akan cocok dengan regex ini:

/^(\d+)x?$/  // artinya: angka saja atau angka diikuti huruf x
📌 Penjelasan Regex:

^ = awal teks

(\d+) = tangkap angka satu atau lebih

x? = huruf x opsional

$ = akhir teks

🔧 Contoh:
size	  Cocok regex?	Hasil pxMatch[1]	Akhirnya jadi
"300"	  ✅	              300	              "300w"
"300x"	✅	              300	              "300w"
*/
