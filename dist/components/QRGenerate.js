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
function QRGenerate(conn, id, field) {
    return __awaiter(this, void 0, void 0, function* () {
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
            try {
                conn.sendMessage(id, {
                    image: {
                        url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=20&data=${data}`,
                    },
                    caption: String(data),
                });
            }
            catch (err) {
                console.log(err);
            }
            finally {
                console.log("RUNNING QR GENERATOR");
            }
        }
    });
}
exports.default = QRGenerate;
