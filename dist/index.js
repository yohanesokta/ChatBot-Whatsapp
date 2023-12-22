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
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const promises_1 = require("fs/promises");
const wa_sticker_formatter_1 = require("wa-sticker-formatter");
const Connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const { state, saveCreds } = yield (0, baileys_1.useMultiFileAuthState)("auth_info_baileys");
    const conn = (0, baileys_1.default)({ auth: state,
        printQRInTerminal: true
    });
    conn.ev.on("creds.update", saveCreds);
    conn.ev.on("messages.upsert", ({ messages }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = messages[0].key.remoteJid;
        const m = messages[0];
        if (!m.message)
            return;
        const field = Object(messages[0].message).conversation;
        if (field.includes('.menu')) {
            yield conn.sendMessage(String(id), {
                text: "Selamat Datang Di Bot Yohanes"
            });
        }
        const messageType = Object.keys(Object(m.message))[0];
        console.log(messageType);
        if (messageType == "imageMessage") {
            const buffer = yield (0, baileys_1.downloadMediaMessage)(m, 'buffer', {});
            // save to file
            yield (0, promises_1.writeFile)(`./src/res/${id}_Image.jpeg`, buffer);
            const sticker = new wa_sticker_formatter_1.Sticker(`./src/res/${id}_Image.jpeg`, {
                pack: "Hanz Bot Stiker",
                author: "YhanzC Bot"
            });
            const StikerBuffer = yield sticker.toBuffer();
            yield sticker.toFile(`./src/res/stiker.webp`);
            conn.sendMessage(String(id), yield sticker.toMessage());
        }
    }));
});
Connect();
