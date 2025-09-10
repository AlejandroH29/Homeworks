function Child({ id, title, url }) {
return (
    <div>
        <p>{title} (ID: {id})</p>
        <img src={url} alt={title} />
    </div>
);
}

export default Child;
