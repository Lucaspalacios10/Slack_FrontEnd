
import { ServerError } from "../utils/errorUtils";
const URL_API = import.meta.env.VITE_API_URL;

export async function getChannels(wsId) {
    const resp = await fetch(`${URL_API}/api/workspace/${wsId}/channels`, {
        headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
    });
    const body = await resp.json();
    if (!resp.ok) throw new ServerError(body.message, resp.status);
    return body.data.channels;
}

export async function createChannel(wsId, name) {
    const resp = await fetch(`${URL_API}/api/workspace/${wsId}/channels`, {
        method: "POST",
        headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
        body: JSON.stringify({ name }),
    });
    const body = await resp.json();
    if (!resp.ok) throw new ServerError(body.message, resp.status);
    return body.data.channel_created;
}