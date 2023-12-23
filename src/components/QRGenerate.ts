async function QRGenerate(conn: any, id: string, field: string) {
    if (field == ".qr") {
        conn.sendMessage(id, {
            text: "😫 *Dikandani kok angel to yooo*\n\n_tulis *. qr tanpa spasi* trus spasi trus link e opo_",
        });
    } else {
        let data: string;
        if (field.includes(".qr")) {
            data = field.replace(".qr", "");
            if (data == "") {
                data = "example.com";
            }
        } else {
            data = field;
        }
        console.log(data);
        try {
            conn.sendMessage(id, {
                image: {
                    url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=20&data=${data}`,
                },
                caption: String(data),
            });
        } catch (err) {
            console.log(err);
        } finally {
            console.log("RUNNING QR GENERATOR");
        }
    }
}

export default QRGenerate;
