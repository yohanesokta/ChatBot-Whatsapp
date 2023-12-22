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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
require("dotenv/config");
require("dotenv").config();
const OpenAI_API = process.env.OPEN_AI_API;
const openai = new openai_1.default({
    apiKey: OpenAI_API,
});
function ChatGPT(message) {
    return __awaiter(this, void 0, void 0, function* () {
        let completion;
        try {
            completion = yield openai.chat.completions.create({
                model: "gpt-3.5-turbo-0613",
                messages: [{ role: "user", content: message }],
            });
        }
        catch (err) {
            console.log(err);
            completion = "🙏 Maaf banget lagi ada masalah sama Chat GPT *[api]*";
        }
        finally {
            console.log("Api Run Completely");
        }
        return Object(completion.choices[0]).message.content;
    });
}
exports.default = ChatGPT;
