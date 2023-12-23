import "dotenv/config";
const request = require("request");

require("dotenv").config();

// ambil variable api key
const apiKey = process.env.THECAT_API;
const endpoint = "https://api.thecatapi.com/v1/images/search";

const TheCat = async (conn: any, id: string) => {
    conn.sendMessage(id, {
        text: "_🤖 Mencari_ ...",
    });
    try {
        const data = await fetch(`${endpoint}?=api_key=${apiKey}`, {
            method: "GET",
        });
        const url = await data.json();
        conn.sendMessage(id, {
            image: {
                url: url[0].url,
            },
        });
    } catch (error) {
        console.dir(error);
    } finally {
        console.log("RUNNING CAT API");
    }
};
export default TheCat;
