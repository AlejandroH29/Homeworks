import { useState, useEffect } from "react";
import Child from "./Child";

function Parent() {
const [images, setImages] = useState([]);
const [id, setId] = useState("");
const [title, setTitle] = useState("");
const [filter, setFilter] = useState("");
const [search, setSearch] = useState("");

useEffect(() => {
    console.log("El componente Parent se ha montado");
}, []);

function addImage(e) {
    e.preventDefault();
    const newImage = {
        id: id,
        title: title,
        url: `https://picsum.photos/id/${id}/200/300`
    };
    setImages([...images, newImage]);
    setId("");
    setTitle("");
}

function searchImage(e) {
    e.preventDefault();
    setFilter(search);
}

const filtered = images.filter((img) =>
    img.title.toLowerCase().includes(filter.toLowerCase())
);

return (
    <div>
        <h1>Estructuras de datos 2 Parcial 1</h1>
        <h2>Agregar imagen</h2>
        <form onSubmit={addImage}>
            <input type="number" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)}/>
            <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button type="submit">Agregar</button>
        </form>
        <h2>Buscar por título</h2>
        <form onSubmit={searchImage}>
            <input type="text" placeholder="Buscar titulo" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button type="submit">Buscar</button>
        </form>
        <h2>Imágenes</h2>
        {filtered.length === 0 ? (
        <p>No hay imágenes</p>
        ) : (
        filtered.map((img, i) => (
            <Child key={i} id={img.id} title={img.title} url={img.url} />
        ))
        )}
    </div>
);
}

export default Parent;
