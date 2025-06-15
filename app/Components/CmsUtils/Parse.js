export function parseToBlocks(markdown) { // Ubah markdown ke struktur blok

  // console.log('hasil dari randerdiaryContent :', markdown);

  const lines = markdown.split('\n'); // memecah konten berdasarkan baris.
  // console.log('hasil dari markdown split :', lines);

  const blocks = []; // array kosong untuk menyimpan blok hasil parsing (seperti heading, paragraph, dll).
  // console.log(blocks);

  for (let line of lines) { //  kita periksa satu baris markdown setiap kali loop.
    line = line.trim(); // trim() = menghapus spasi/kosong di awal/akhir baris.
    if (!line) continue;

    if (line.startsWith('### ')) {
      blocks.push({ type: 'heading', level: 3, text: line.slice(4) }); // slice mulai dari index 4
    } else if (line.startsWith('## ')) {
      blocks.push({ type: 'heading', level: 2, text: line.slice(3) });
    } else if (line.startsWith('# ')) {
      blocks.push({ type: 'heading', level: 1, text: line.slice(2) });


    } else if (line.startsWith('- ')) {
      const items = [];
      while (line.startsWith('- ')) {
        items.push(line.slice(2)); // ambil dari dalam lines langsung push kedalam items, ulangi sampai lines tidak ada ('- ')
        line = lines.shift() || '';
      }
      blocks.push({ type: 'list', items });


    } else if (line.match(/^!\[.*\]\(.*\)$/)) { // line apakah gambar markdown untuk verifikasi
      const match = line.match(/^!\[(.*?)\]\((.*?)\)$/); // ambil dengan regex jadikan alt and url
      if (match) {
        blocks.push({ type: 'image', alt: match[1], url: match[2] }); // destructure
      }


    } else {
      blocks.push({ type: 'paragraph', text: line }); // Baris apa pun yang bukan list, bukan heading, bukan gambar, akan dianggap paragraf biasa.
    }
  }

  return blocks;
}


// line.match(/^!\[.*\]\(.*\)$/)
/*

line.match(/^!\[.*\]\(.*\)$/)
Cek apakah line adalah gambar markdown.

Artinya:
Harus diawali ![

Diikuti teks bebas (alt text)
Lalu ](

Diikuti URL
Ditutup dengan )

Ini hanya memverifikasi: “apakah bentuknya gambar?”

2. const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
Sekarang kita ambil datanya, dengan regex capture group:

(.*?): Tangkap isi dalam [ ] → jadi alt

(.*?): Tangkap isi dalam ( ) → jadi url

Contoh:

markdown
![Pemandangan](https://cdn.wisata.app/image1.jpg)
Maka hasil match adalah:

[
  "![Pemandangan](https://cdn.wisata.app/image1.jpg)",  // Full match
  "Pemandangan",                                         // Group 1 (alt)
  "https://cdn.wisata.app/image1.jpg"                   // Group 2 (url)
]
3. blocks.push({ type: 'image', alt: match[1], url: match[2] });
Hasilnya dimasukkan ke dalam array blocks:

js
Copy
Edit
{
  type: "image",
  alt: "Pemandangan",
  url: "https://cdn.wisata.app/image1.jpg"
}

*/
