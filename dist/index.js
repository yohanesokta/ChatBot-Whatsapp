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
const keep_alive = require("../keep_alive.js");
const Connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const { state, saveCreds } = yield (0, baileys_1.useMultiFileAuthState)("auth_info_baileys");
    const conn = (0, baileys_1.default)({ auth: state, printQRInTerminal: true });
    conn.ev.on("creds.update", saveCreds);
    conn.ev.on("messages.upsert", ({ messages }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const id = String(messages[0].key.remoteJid);
        const m = messages[0];
        if (!m.message)
            return;
        const field = Object(messages[0].message).conversation;
        const messageType = Object.keys(Object(m.message))[0];
        if (field.includes(".menu")) {
            const Mess = (0, MenuMessage_1.default)();
            yield conn.sendMessage(id, Mess);
        }
        if (field.includes(".stiker")) {
            yield conn.sendMessage(id, {
                text: "*Haduhhhhhh*\n\nGini loo, Kirim gambar kemudian beri caption *.stiker* OK 👍",
            });
        }
        if (field.includes(".gpt")) {
            const pesan = field.replace(".gpt", "");
            yield conn.sendMessage(id, {
                text: "🤖 *admin* sedang berfikir",
            });
            const mes = yield (0, ChatGptConnect_1.default)(String(pesan));
            yield conn.sendMessage(id, {
                text: String(mes),
            });
        }
        console.log(messageType);
        if (messageType == "imageMessage") {
            const Caption = (_a = m.message.imageMessage) === null || _a === void 0 ? void 0 : _a.caption;
            if (Caption === null || Caption === void 0 ? void 0 : Caption.includes(".stiker")) {
                const sticker = (0, CreateStiker_1.default)(m);
                conn.sendMessage(id, yield sticker);
            }
        }
    }));
});
Connect();
