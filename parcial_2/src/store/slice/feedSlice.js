
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
 reducers: {
    setFeed: (state, action) => action.payload,
    addPost: (state, action) => {
      state.unshift(action.payload);
    },
    clearFeed: () => []
  }
});

export const { setFeed, addPost, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;