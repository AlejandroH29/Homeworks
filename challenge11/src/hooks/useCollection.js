import { db } from "../firebase/config";
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

const useCollection = (table) => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const getAll = async (condition) => {
        setResults([]);
        let q = null;
        if (condition && condition.length === 3) {
            q = query(collection(db, table), where(condition[0], condition[1], condition[2]));
        } else {
            q = query(collection(db, table));
        }
        const resDoc = await getDocs(q);
        const docsArray = [];
        resDoc.forEach(docu => {
            docsArray.push({ ...docu.data(), id: docu.id });
        });
        setResults(docsArray);
    };

    const add = async (docu) => {
        setError(null);
        setIsPending(true);
        try {
            let resDoc = await addDoc(collection(db, table), docu);
            setIsPending(false);
            return resDoc;
        } catch (err) {
            setError("could not send the message");
            setIsPending(false);
            return null;
        }
    };

    // NUEVO: actualizar documento
    const update = async (id, data) => {
        setError(null);
        setIsPending(true);
        try {
            const ref = doc(db, table, id);
            await updateDoc(ref, data);
            setIsPending(false);
            return true;
        } catch (err) {
            setError("could not update the document");
            setIsPending(false);
            return false;
        }
    };

    // NUEVO: eliminar documento
    const remove = async (id) => {
        setError(null);
        setIsPending(true);
        try {
            const ref = doc(db, table, id);
            await deleteDoc(ref);
            setIsPending(false);
            return true;
        } catch (err) {
            setError("could not delete the document");
            setIsPending(false);
            return false;
        }
    };

    return { isPending, results, add, getAll, update, remove };
};
export { useCollection };