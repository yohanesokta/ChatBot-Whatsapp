"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function QRGenerate(conn, id, field) {
    if (field == ".qr") {
        conn.sendMessage(id, {
            text: "😫 *Dikandani kok angel to yooo*\n\n_tulis *. qr tanpa spasi* trus spasi trus link e opo_",
        });
    }
    else {
        let data;
        if (field.includes(".qr")) {
            data = field.replace(".qr", "");
            if (data == "") {
                data = "example.com";
            }
        }
        else {
            data = field;
        }
        console.log(data);
        conn.sendMessage(id, {
            image: {
                url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=20&data=${data}`,
            },
            caption: String(data),
        });
    }
}
exports.default = QRGenerate;
