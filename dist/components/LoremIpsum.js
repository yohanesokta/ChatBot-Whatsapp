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
require("dotenv/config");
const request = require("request");
require("dotenv").config();
const apiKey = process.env.NINJA_API;
function loremipsum(conn, id, field) {
    return __awaiter(this, void 0, void 0, function* () {
        const pesan = field.replace(".lorem", "");
        yield request.get({
            url: "https://api.api-ninjas.com/v1/loremipsum?random=true&max_length=" +
                pesan,
            headers: {
                "X-Api-Key": apiKey,
            },
        }, function (error, response, body) {
            if (error)
                return console.error("Request failed:", error);
            else if (response.statusCode != 200)
                return console.error("Error:", response.statusCode, body.toString("utf8"));
            else {
                conn.sendMessage(id, {
                    text: String(JSON.parse(String(body)).text),
                });
                return body;
            }
        });
    });
}
exports.default = loremipsum;
