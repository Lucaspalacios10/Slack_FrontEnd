import { createContext, useState } from "react";
import { getMessages, postMessage } from "../services/message.Service.js";

export const MessageContext = createContext({
    messages: [],
    loadMessages: async () => { },
    postWorkspaceMessage: async () => { }
});

const MessageContextProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    const loadMessages = async (workspaceId) => {
        try {
            const res = await getMessages(workspaceId);
            const msgs =
                res?.data?.messages ||
                res?.messages ||
                res?.data ||
                res || [];
            setMessages(Array.isArray(msgs) ? msgs : []);
            return msgs;
        } catch (err) {
            console.error("Failed to load messages", err);
            throw err;
        }
    };

    const postWorkspaceMessage = async (workspaceId, message) => {
        try {
            const payload = typeof message === 'string' ? { text: message } : message;
            const res = await postMessage(workspaceId, payload);
            console.log('Post message response:', res);


            let created = res.data || res.new_message || res;
            console.log(res.message && typeof res.message === 'object')

            setMessages(prev => [...prev,{
                    ...payload, messages: payload.text,
                    _id: Date.now(), 
                    createdAt: new Date().toISOString(),
                    senderName: 'You (sending...)', 
                    isTemporary: true
                }]);
            return created;
        } catch (err) {
            console.error("Failed to post message", err);
            throw err;
        }
    };

    const providerValues = {
        messages,
        loadMessages,
        postWorkspaceMessage
    };
    return (
        <MessageContext.Provider value={providerValues}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageContextProvider;
