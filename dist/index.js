"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const CreateStiker_1 = __importDefault(require("./components/CreateStiker"));
const MenuMessage_1 = __importDefault(require("./components/MenuMessage"));
const ChatGptConnect_1 = __importDefault(require("./components/ChatGptConnect"));
const LoremIpsum_1 = __importDefault(require("./components/LoremIpsum"));
const QRGenerate_1 = __importDefault(require("./components/QRGenerate"));
const TheCat_1 = __importDefault(require("./components/TheCat"));
const TheDog_1 = __importDefault(require("./components/TheDog"));
require("dotenv/config");
const keep_alive = require("../keep_alive.js");
let mode = 1;
const Connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const { state, saveCreds } = yield (0, baileys_1.useMultiFileAuthState)("auth_info_baileys");
    const conn = (0, baileys_1.default)({ auth: state, printQRInTerminal: true });
    conn.ev.on("creds.update", saveCreds);
    conn.ev.on("messages.upsert", ({ messages }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const id = String(messages[0].key.remoteJid);
        const m = messages[0];
        if (!m.message)
            return;
        const field = Object(messages[0].message).conversation;
        const messageType = Object.keys(Object(m.message))[0];
        const Extended = String((_a = m.message.extendedTextMessage) === null || _a === void 0 ? void 0 : _a.text);
        if (Extended.includes("*.qr*"))
            return;
        if (field.includes(".menu") || Extended.includes(".menu")) {
            const Mess = (0, MenuMessage_1.default)();
            yield conn.sendMessage(id, Mess);
        }
        if (field.includes(".stiker") || Extended.includes(".stiker")) {
            yield conn.sendMessage(id, {
                text: "*Haduhhhhhh*\n\nGini loo, Kirim gambar kemudian beri caption *.stiker* OK 👍",
            });
        }
        if (field.includes(".gpt") || Extended.includes(".gpt")) {
            let pesan;
            if (Extended.includes(".gpt")) {
                pesan = Extended.replace(".gpt", "");
            }
            else {
                pesan = field.replace(".gpt", "");
            }
            yield conn.sendMessage(id, {
                text: "🤖 *admin* sedang berfikir",
            });
            const mes = yield (0, ChatGptConnect_1.default)(String(pesan));
            yield conn.sendMessage(id, {
                text: String(mes),
            });
        }
        if (field.includes(".lorem") || Extended.includes(".lorem")) {
            let mess;
            if (Extended.includes(".lorem")) {
                mess = Extended;
            }
            else {
                mess = field;
            }
            (0, LoremIpsum_1.default)(conn, id, mess);
        }
        if (field.includes(".cat") || Extended.includes(".cat")) {
            (0, TheCat_1.default)(conn, id);
        }
        if (field.includes(".qr")) {
            (0, QRGenerate_1.default)(conn, id, field);
        }
        if (field.includes(".dog")) {
            conn.sendMessage(id, {
                text: "_🤖 Mencari_ ...",
            });
            const data = (0, TheDog_1.default)();
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
            if (String((_b = m.message.extendedTextMessage) === null || _b === void 0 ? void 0 : _b.matchedText).length > 1)
                (0, QRGenerate_1.default)(conn, id, String((_c = m.message.extendedTextMessage) === null || _c === void 0 ? void 0 : _c.matchedText));
        }
        if (messageType == "imageMessage") {
            const Caption = (_d = m.message.imageMessage) === null || _d === void 0 ? void 0 : _d.caption;
            if (Caption === null || Caption === void 0 ? void 0 : Caption.includes(".stiker")) {
                const sticker = (0, CreateStiker_1.default)(m);
                conn.sendMessage(id, yield sticker);
            }
        }
        // Disini menampilkan mode debug pesan yaitu diambil antara field dan Extended text dari pesan
        const DEBUG = process.env.DEVMODE;
        if (DEBUG == "true") {
            console.log(`Isi (Extended) (${id}) : "${Extended}"\n`);
            console.log(`Isi (Conversation) (${id}) : "${field}"`);
        }
        else if (mode > 0) {
            console.info(`\nDEBUG MODE DINONAKTIFKAN | NYALAKAN DALAM ".env" | contoh | DEBUG = true (boolean)\n`);
            mode = 0;
        }
    }));
});
Connect();
