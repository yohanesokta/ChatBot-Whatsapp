import OpenAI from "openai";
import "dotenv/config";

require("dotenv").config();

const OpenAI_API = process.env.OPEN_AI_API;

const openai = new OpenAI({
    apiKey: OpenAI_API,
});

async function ChatGPT(message: string) {
    let completion: any;
    try {
        completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0613",
            messages: [{ role: "user", content: message }],
        });
    } catch (err) {
        console.log(err);
        completion = "🙏 Maaf banget lagi ada masalah sama Chat GPT *[api]*";
    } finally {
        console.log("Api Run Completely");
    }
    return Object(completion.choices[0]).message.content;
}

export default ChatGPT;
