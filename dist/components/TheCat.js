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
require("dotenv").config();
// ambil variable api key
const apiKey = process.env.THECAT_API;
const endpoint = "https://api.thecatapi.com/v1/images/search";
const TheCat = (conn, id) => __awaiter(void 0, void 0, void 0, function* () {
    conn.sendMessage(id, {
        text: "_🤖 Mencari_ ...",
    });
    try {
        const data = yield fetch(`${endpoint}?=api_key=${apiKey}`, {
            method: "GET",
        });
        const url = yield data.json();
        conn.sendMessage(id, {
            image: {
                url: url[0].url,
            },
        });
    }
    catch (error) {
        console.dir(error);
    }
    finally {
        console.log("RUNNING CAT API");
    }
});
exports.default = TheCat;
