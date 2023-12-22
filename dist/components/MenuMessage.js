"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pesan = `
*.menu* : untuk mengaktifkan menu

*.stiker* + *Gambar* : mengubah gambar ke stiker

*.gpt* + *pertanyaan* : untuk memakai chat gpt dalam chat

*.lorem* + Panjang (angka) : generate kata dummy dengan panjang tertentu

*.qr* + (url) : generate code qr otomatis
`;
const MenuMessage = () => {
    const message = {
        title: "*Kamu Tanya Hanes Bekerja*",
        text: "Kirim Beberapa Format Pesan Berikut : \n",
        colum: pesan,
        footer: "",
    };
    const templateMessage = {
        text: `${message.title}\n${message.text}\n${message.colum}`,
    };
    return templateMessage;
};
exports.default = MenuMessage;
