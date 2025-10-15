import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    pushNotification: (state, action) => {
      state.push(action.payload);
    },
    popNotification: (state) => {
      state.pop();
    },
    clearNotifications: () => []
  }
});

export const { pushNotification, popNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;