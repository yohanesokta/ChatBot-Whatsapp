import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import * as fs from "fs";
import CreateSticker from "./components/CreateStiker";
import { Sticker, createSticker, StickerTypes } from "wa-sticker-formatter";
import MenuMessage from "./components/MenuMessage";
import ChatGPT from "./components/ChatGptConnect";
import loremipsum from "./components/LoremIpsum";
import QRGenerate from "./components/QRGenerate";
import TheCat from "./components/TheCat";
import DogGenerate from "./components/TheDog";
import "dotenv/config";

const keep_alive = require("../keep_alive.js");
let mode = 1;

const Connect = async () => {
  const { state, saveCreds } = await useMultiFileAuthState(
    "auth_info_baileys"
  );
  const conn = makeWASocket({ auth: state, printQRInTerminal: true });
  conn.ev.on("creds.update", saveCreds);

  conn.ev.on("messages.upsert", async ({ messages }: any) => {
    const id = String(messages[0].key.remoteJid);
    const m = messages[0];

    if (!m.message) return;
    const field = Object(messages[0].message).conversation;
    const messageType = Object.keys(Object(m.message))[0];
    const Extended = String(m.message.extendedTextMessage?.text);
    if (Extended.includes("*.qr*")) return;

    if (field.includes(".menu") || Extended.includes(".menu")) {
      const Mess = MenuMessage();
      await conn.sendMessage(id, Mess);
    }
    if (field.includes(".stiker") || Extended.includes(".stiker")) {
      await conn.sendMessage(id, {
        text: "*Haduhhhhhh*\n\nGini loo, Kirim gambar kemudian beri caption *.stiker* OK 👍",
      });
    }
    if (field.includes(".gpt") || Extended.includes(".gpt")) {
      let pesan;
      if (Extended.includes(".gpt")) {
        pesan = Extended.replace(".gpt", "");
      } else {
        pesan = field.replace(".gpt", "");
      }
      await conn.sendMessage(id, {
        text: "🤖 *admin* sedang berfikir",
      });
      const mes = await ChatGPT(String(pesan));
      await conn.sendMessage(id, {
        text: String(mes),
      });
    }
    if (field.includes(".lorem") || Extended.includes(".lorem")) {
      let mess;
      if (Extended.includes(".lorem")) {
        mess = Extended;
      } else {
        mess = field;
      }
      loremipsum(conn, id, mess);
    }
    if (field.includes(".cat") || Extended.includes(".cat")) {
      TheCat(conn, id);
    }
    if (field.includes(".qr")) {
      QRGenerate(conn, id, field);
    }
    if (field.includes(".dog") || Extended.includes(".dog")) {
      conn.sendMessage(id, {
        text: "_🤖 Mencari_ ...",
      });
      const data = DogGenerate();
      data.then((response) => response.json())
        .then((result) => {
          conn.sendMessage(id, {
            image: {
              url: result[0].url,
            },
          });
        })
        .catch((error) => console.error(error));
    }

    if (Extended.includes(".qr") && !Extended.includes("*.qr*")) {
      if (String(m.message.extendedTextMessage?.matchedText).length > 1)
        QRGenerate(
          conn,
          id,
          String(m.message.extendedTextMessage?.matchedText)
        );
    }

    if (messageType == "imageMessage") {
      const Caption = m.message.imageMessage?.caption;
      if (Caption?.includes(".stiker")) {
        const sticker = CreateSticker(m);
        conn.sendMessage(id, await sticker);
      }
    }

    // Disini menampilkan mode debug pesan yaitu diambil antara field dan Extended text dari pesan

    const DEBUG = process.env.DEVMODE;
    if (DEBUG == "true") {
      console.log("------------------------------------------");
      console.log(`Isi (Extended) (${id}) : "${Extended}"\n`);
      console.log(`Isi (Conversation) (${id}) : "${field}"`);
    } else if (mode > 0) {
      console.info(
        `\nDEBUG MODE DINONAKTIFKAN | NYALAKAN DALAM ".env" | contoh | DEBUG = true (boolean)\n`
      );
      mode = 0;
    }
  });
};

Connect();
