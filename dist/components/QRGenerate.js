"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function QRGenerate(conn, id, field) {
    const data = field.replace(".qr", "");
    conn.sendMessage(id, {
        image: {
            url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=20&data=${data}`,
        },
        caption: String(data),
    });
}
exports.default = QRGenerate;
