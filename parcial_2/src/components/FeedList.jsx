import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../store/slice/feedSlice";
import { pushNotification } from "../store/slice/notificacionSlice";
import { LinkedList } from "../estructura/LinkedList";
import { saveFeedToFirebase, subscribeToFeedGlobal } from "../store/firebaseSync";

const FeedList = () => {
  const [text, setText] = useState("");
  const feedArray = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    subscribeToFeedGlobal(dispatch);
  }, [dispatch]);

  const feedList = new LinkedList();
  feedArray.forEach(post => feedList.insertLast(post));

  const handlePost = () => {
    if (text.trim() === "") return;
    const post = { id: Date.now(), text };
    feedList.insertFirst(post); 
    const newFeed = feedList.toArray();
    dispatch(setFeed(newFeed));
    saveFeedToFirebase(newFeed); 
    dispatch(pushNotification(`Nueva publicación: "${text}"`));
    setText("");
  };


  const handleRemove = (id) => {
    feedList.removeById(id);
    const newFeed = feedList.toArray();
    dispatch(setFeed(newFeed));
    saveFeedToFirebase(newFeed); 
  };

  return (
    <div>
      <h2>Feed (Lista de publicaciones)</h2>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="¿Qué quieres publicar?" />
      <button onClick={handlePost}>Publicar</button>
      <ul>
        {feedList.toArray().map((post) => (
          <li key={post.id}>
            {post.text}
            <button onClick={() => handleRemove(post.id)} style={{marginLeft: 8}}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedList;