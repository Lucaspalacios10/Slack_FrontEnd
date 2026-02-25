
import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { MessageContext } from "./messageContext";
import { AuthContext } from "./authContext";
import useInviteMember from "../hooks/useInviteMember";
import './MessageList.css';

function MessageList() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { messages, loadMessages, postWorkspaceMessage } = useContext(MessageContext);
    const { session } = useContext(AuthContext);
    const [text, setText] = useState("");
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        isLoading: isInviting,
        error: inviteError,
        successMessage
    } = useInviteMember(id);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (id) {
            loadMessages(id);
        }
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        try {
            await postWorkspaceMessage(id, {
                content: text,
                text,
                workspaceId: id,
                senderId: currentUserId
            });
            setText("");
        } catch (err) {
            console.error("Error sending message", err);
        }
    };

    const list = Array.isArray(messages) ? messages : [];
    const currentUserId = session?.id || session?._id;

    return (
        <div className="workspace-chat-container">
            <header className="chat-header">
                <button className="back-button" onClick={() => navigate('/home')}>
                    Volver
                </button>
                <h2>Chat del Workspace</h2>
                <button className="invite-member-btn" onClick={() => setIsInviteModalOpen(!isInviteModalOpen)}>
                    {isInviteModalOpen ? 'Cerrar' : '+ Invitar'}
                </button>
            </header>

            {isInviteModalOpen && (
                <div className="invite-section">
                    <form className="invite-form" onSubmit={(e) => {
                        onSubmitForm(e);
                        if (!inviteError && !isInviting) {
                            setTimeout(() => {

                            }, 2000);
                        }
                    }}>
                        <h3>Invitar a una persona</h3>
                        <div className="invite-input-group">
                            <input
                                name="email"
                                type="email"
                                placeholder="Email del invitado"
                                value={form_state.email}
                                onChange={onChangeFieldValue}
                                required
                            />
                            <select
                                name="role"
                                value={form_state.role}
                                onChange={onChangeFieldValue}
                            >
                                <option value="User">Miembro</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <button type="submit" disabled={isInviting}>
                                {isInviting ? 'Enviando...' : 'Invitar'}
                            </button>
                        </div>
                        {inviteError && <p className="error-msg">{inviteError.message}</p>}
                        {successMessage && <p className="success-msg">{successMessage}</p>}
                    </form>
                </div>
            )}

            <div className="messages-area">
                {list.length === 0 ? (
                    <div className="empty-state">No hay mensajes aún. ¡Sé el primero en escribir!</div>
                ) : (
                    list.map((m, idx) => {
                        const senderIdentifier = m.senderId || m.fk_id_MembersWorkSpace?.fk_id_user?._id || m.author || m.user || (typeof m.author === 'object' ? m.author?._id : null);
                        const isMyMessage = (senderIdentifier === currentUserId) || (m.senderName === 'You');

                        return (
                            <div
                                key={m._id || idx}
                                className={`message-bubble ${isMyMessage ? 'my-message' : 'other-message'}`}
                            >
                                <div className="message-sender">
                                    {m.senderName || m.fk_id_MembersWorkSpace?.fk_id_user?.username || m.sender?.username || m.author?.username || m.from || (isMyMessage ? (session?.username || 'Yo') : 'Usuario')}
                                </div>
                                <div className="message-content">
                                    {m.messages}
                                </div>
                                <div className="message-time">
                                    {m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className="message-input-form" onSubmit={handleSubmit}>
                <input
                    className="message-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Escribe un mensaje..."
                />
                <button type="submit" className="send-button">
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default MessageList;
