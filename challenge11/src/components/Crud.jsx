import React, { useState, useEffect } from "react";
import { useCollection } from "../hooks/useCollection";

const Crud = () => {
    const [user, setUser] = useState({ name: "" });
    const [editId, setEditId] = useState(null);
    const { add, getAll, isPending, results, update, remove } = useCollection("users");

    const getAllDocs = async () => {
        await getAll([]);
    };

    const save = async () => {
        if (editId) {
            await update(editId, { name: user.name });
            setEditId(null);
        } else {
            await add(user);
        }
        setUser({ name: "" });
        await getAllDocs();
    };

    const handleSetUser = (event) => {
        setUser({ name: event.target.value });
    };

    const handleEdit = (item) => {
        setUser({ name: item.name });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        await remove(id);
        await getAllDocs();
    };

    useEffect(() => {
        getAllDocs();
    }, []);

    return (
        <>
            <h1>Guarda un usuario</h1>
            <h2>Nombre usuario:</h2>
            <input type="text" onChange={handleSetUser} value={user.name} />
            <button type="button" onClick={save}>{editId ? "Actualizar" : "Guardar"}</button>
            {isPending ? <span> Saving...</span> : ""}
            <ul>
                {results.map(item => (
                    <li key={item.id}>
                        {JSON.stringify(item)}
                        <button onClick={() => handleEdit(item)} style={{ marginLeft: 8 }}>Editar</button>
                        <button onClick={() => handleDelete(item.id)} style={{ marginLeft: 8 }}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </>
    );
};
export { Crud };