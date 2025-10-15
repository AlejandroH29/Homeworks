import { ref, set, get, onValue } from "firebase/database";
import { db } from "../firebase/config";
import { setFeed, clearFeed } from "./slice/feedSlice";


export const saveFeedToFirebase = (feedArray) => {
  set(ref(db, `feedGlobal`), feedArray);
};


export const subscribeToFeedGlobal = (dispatch) => {
  const feedRef = ref(db, `feedGlobal`);
  onValue(feedRef, (snapshot) => {
    const feed = snapshot.val() || [];
    dispatch(clearFeed());
    dispatch(setFeed(feed));
  });
};