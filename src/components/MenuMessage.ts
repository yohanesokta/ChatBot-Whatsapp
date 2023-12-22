const MenuMessage = () => {
    const message = {
        title: "*#Kamu Tanya Hanes Bekerja*\n",
        text: "Kirim Beberapa Format Pesan Berikut : \n",
        colum: "*.menu* : untuk mengaktifkan menu\n*.stiker* + *Gambar* : mengubah gambar ke stiker\n*.gpt* + *pertanyaan* : untuk memakai chat gpt dalam chat",
        footer: "",
    };

    const templateMessage = {
        text: `${message.title}\n${message.text}\n${message.colum}`,
    };

    return templateMessage;
};

export default MenuMessage;
