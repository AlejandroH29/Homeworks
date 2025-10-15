import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./slice/feedSlice.js";
import notificationReducer from "./slice/notificacionSlice.js";
import directQueueReducer from "./slice/directQueueSlice.js";

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    notifications: notificationReducer,
    directQueue: directQueueReducer,
  },
});