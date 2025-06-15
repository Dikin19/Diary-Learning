export const sanitizeTextContent = (text) => {
    // console.log('hasil dari sanitizeTextContent', text)


    if (!text) return "";

    const escapedText = text
        .replace(/\\\./g, ".") // menghapus \. menjadi titik biasa

        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        /*
        Input:  "Ini adalah **teks tebal**"
        Output: "Ini adalah <strong>teks tebal</strong>"
        Penjelasan: Mengubah teks tebal ke elemen HTML <strong>, supaya ditampilkan bold di halaman.
        */
        .replace(/__(.*?)__/g, "<em>$1</em>")
        /*
        Input:  "Ini adalah __teks miring__"
        Output: "Ini adalah <em>teks miring</em>"
        Penjelasan: Mengubah teks miring ke elemen HTML <em> (italic), jadi nanti akan tampil miring.
        */
        .replace(/\n/g, "<br/>") // Penjelasan: Ganti karakter newline (enter) dengan <br/>, agar baris baru terlihat di browser.

    return escapedText.trim();
}
