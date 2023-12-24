require("dotenv").config();

const endpoint =
    "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1";

const apiKey = process.env.THEDOG_API;

const DogGenerate = () => {
    let data = fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": String(apiKey),
        },
        redirect: "follow",
    });

    return data;
};
export default DogGenerate;
