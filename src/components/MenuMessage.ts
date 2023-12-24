const pesan: string = `
*.menu* : untuk mengaktifkan menu

*.stiker* + *Gambar* : mengubah gambar ke stiker

*.gpt* + *pertanyaan* : untuk memakai chat gpt dalam chat

*.lorem* + Panjang (angka) : generate kata dummy dengan panjang tertentu

*.qr* + (url) : generate code qr otomatis

*.cat* : Gambar Kucing Random

*.dog* : Nek iki khusus Dog Random 🐶
`;

const MenuMessage = () => {
    const message = {
        title: "*Kamu Tanya Hanes Menjawab*",
        text: "Kirim Beberapa Format Pesan Berikut : \n",
        colum: pesan,
        footer: "\n*Stay Creative 😜*",
    };

    const templateMessage = {
        text: `${message.title}\n${message.text}\n${message.colum}\n${message.footer}`,
    };

    return templateMessage;
};

export default MenuMessage;
