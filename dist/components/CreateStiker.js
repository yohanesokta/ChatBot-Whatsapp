"use strict";
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
const baileys_1 = require("@whiskeysockets/baileys");
const promises_1 = require("fs/promises");
const wa_sticker_formatter_1 = require("wa-sticker-formatter");
const CreateSticker = (m) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Mengaktifkan Pembuat Stiker ...");
    const id = m.key.remoteJid;
    const buffer = yield (0, baileys_1.downloadMediaMessage)(m, 'buffer', {});
    const file = "./src/res/Buffer.jpeg";
    // save to file
    yield (0, promises_1.writeFile)(file, buffer);
    const sticker = new wa_sticker_formatter_1.Sticker(file, {
        pack: "Umume Stiker",
        author: "Bot Yohanes"
    });
    const StikerBuffer = yield sticker.toBuffer();
    yield sticker.toFile(`./src/res/stiker.webp`);
    return (sticker.toMessage());
});
exports.default = CreateSticker;
