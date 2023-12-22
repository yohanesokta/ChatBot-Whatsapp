import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import * as fs from "fs";
import CreateSticker from "./components/CreateStiker";
import { Sticker, createSticker, StickerTypes } from "wa-sticker-formatter";
import MenuMessage from "./components/MenuMessage";
import ChatGPT from "./components/ChatGptConnect";
import loremipsum from "./components/LoremIpsum";
import QRGenerate from "./components/QRGenerate";

const keep_alive = require("../keep_alive.js");

const Connect = async () => {
    const { state, saveCreds } = await useMultiFileAuthState(
        "auth_info_baileys"
    );
    const conn = makeWASocket({ auth: state, printQRInTerminal: true });
    conn.ev.on("creds.update", saveCreds);

    conn.ev.on("messages.upsert", async ({ messages }) => {
        const id = String(messages[0].key.remoteJid);
        const m = messages[0];

        if (!m.message) return;

        const field = Object(messages[0].message).conversation;
        const messageType = Object.keys(Object(m.message))[0];

        if (field.includes(".menu")) {
            const Mess = MenuMessage();
            await conn.sendMessage(id, Mess);
        }
        if (field.includes(".stiker")) {
            await conn.sendMessage(id, {
                text: "*Haduhhhhhh*\n\nGini loo, Kirim gambar kemudian beri caption *.stiker* OK 👍",
            });
        }
        if (field.includes(".gpt")) {
            const pesan = field.replace(".gpt", "");
            await conn.sendMessage(id, {
                text: "🤖 *admin* sedang berfikir",
            });
            const mes = await ChatGPT(String(pesan));
            await conn.sendMessage(id, {
                text: String(mes),
            });
        }
        if (field.includes(".lorem")) {
            loremipsum(conn, id, field);
        }
        if (field.includes(".qr")) {
            QRGenerate(conn, id, field);
        }

        console.log(messageType);
        if (messageType == "imageMessage") {
            const Caption = m.message.imageMessage?.caption;
            if (Caption?.includes(".stiker")) {
                const sticker = CreateSticker(m);
                conn.sendMessage(id, await sticker);
            }
        }
    });
};

Connect();
