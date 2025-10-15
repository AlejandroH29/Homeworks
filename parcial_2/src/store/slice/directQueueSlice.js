import { createSlice } from "@reduxjs/toolkit";

const directQueueSlice = createSlice({
  name: "directQueue",
  initialState: [],
  reducers: {
    enqueueMessage: (state, action) => {
      state.push(action.payload);
    },
    dequeueMessage: (state) => {
      state.shift();
    },
    clearQueue: () => [] 
  }
});

export const { enqueueMessage, dequeueMessage, clearQueue } = directQueueSlice.actions;
export default directQueueSlice.reducer;