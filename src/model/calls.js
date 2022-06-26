import { endpoint_generatemusic, server } from "./repository";

export async function callGenerateMusic(_genre) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre: _genre }),
    };
    return new Promise((resolve, reject) => {
        fetch(server + endpoint_generatemusic, requestOptions)
            .then((response) => response.json())
            .then((data) => resolve(data));
    });
}