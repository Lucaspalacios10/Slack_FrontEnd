
import { ServerError } from "../utils/errorUtils";
const URL_API = import.meta.env.VITE_API_URL;

async function parseResponse(response_http) {
    const contentType = response_http.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        const json = await response_http.json();
        if (!response_http.ok) {
            throw new ServerError(json.message || JSON.stringify(json), response_http.status);
        }
        return json;
    } else {
        const text = await response_http.text();
        if (!response_http.ok) {
            throw new ServerError(text || 'Server error', response_http.status);
        }
        return text;
    }
}

export async function getMessages(workspaceId) {
    const headers = {
        'x-api-key': import.meta.env.VITE_API_KEY,
        'Authorization': 'Bearer ' + localStorage.getItem('auth_token'),
    };

    const candidates = [
        `/api/workspace/${workspaceId}/messages`,
        `/api/workspaces/${workspaceId}/messages`,
        `/api/workspace/messages/${workspaceId}`,
        `/api/messages?workspace=${workspaceId}`,
        `/api/message/${workspaceId}`
    ];

    let lastErr = null;
    for (const path of candidates) {
        try {
            const response_http = await fetch(URL_API + path, { method: 'GET', headers });
            const contentType = response_http.headers.get('content-type') || '';
            if (contentType.includes('text/html')) {
                const text = await response_http.text();
                lastErr = new ServerError(text || `HTML response from ${path}`, response_http.status);
                continue;
            }
            const parsed = await parseResponse(response_http);
            return parsed;
        } catch (err) {
            lastErr = err;
        }
    }
    throw lastErr || new ServerError('Failed to fetch messages', 500);
}

export async function postMessage(workspaceId, messageBody) {
    const response_http = await fetch(
        URL_API + `/api/workspace/${workspaceId}/messages`,
        {
            method: 'POST',
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_token'),
            },
            body: JSON.stringify(messageBody)
        }
    );
    return await parseResponse(response_http);
}