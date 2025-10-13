import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirebaseData, addMessageToFirebase } from "../store/slices/thunks";

const DataComponent = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.firebase);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(fetchFirebaseData());
    }, [dispatch]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") return;
        dispatch(addMessageToFirebase({ text: message, timestamp: Date.now() }));
        setMessage("");
    };

    return (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <h2>Chat contigo mismo (Realtime DB)</h2>
            <div style={{ border: "1px solid #ccc", minHeight: 200, padding: 10, marginBottom: 10 }}>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    (!data || data.length === 0) ? (
                        <p>No hay mensajes.</p>
                    ) : (
                        [...data]
                            .sort((a, b) => a.timestamp - b.timestamp)
                            .map((item, idx) => (
                                <div key={idx} style={{ marginBottom: 8 }}>
                                    <span>{item.text}</span>
                                    <span style={{ color: "#888", fontSize: 10, marginLeft: 8 }}>
                                        {item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : ""}
                                    </span>
                                </div>
                            ))
                    )
                )}
            </div>
            <form onSubmit={handleSendMessage} style={{ display: "flex", gap: 8 }}>
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    style={{ flex: 1 }}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default DataComponent;