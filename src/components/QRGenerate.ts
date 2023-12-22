function QRGenerate(conn: any, id: string, field: string) {
    const data = field.replace(".qr", "");
    conn.sendMessage(id, {
        image: {
            url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=20&data=${data}`,
        },
        caption: String(data),
    });
}

export default QRGenerate;
