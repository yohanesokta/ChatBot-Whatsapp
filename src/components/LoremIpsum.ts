import "dotenv/config";
const request = require("request");
require("dotenv").config();

const apiKey = process.env.NINJA_API;

async function loremipsum(conn: any, id: string, field: string) {
    const pesan = field.replace(".lorem", "");
    await request.get(
        {
            url:
                "https://api.api-ninjas.com/v1/loremipsum?random=true&max_length=" +
                pesan,
            headers: {
                "X-Api-Key": apiKey,
            },
        },
        function (error: any, response: any, body: any) {
            if (error) return console.error("Request failed:", error);
            else if (response.statusCode != 200)
                return console.error(
                    "Error:",
                    response.statusCode,
                    body.toString("utf8")
                );
            else {
                conn.sendMessage(id, {
                    text: String(JSON.parse(String(body)).text),
                });
                return body;
            }
        }
    );
}

export default loremipsum;
