import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import errorReducer from "./error";
import blogsReducer from "./blogs";

const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    blogs: blogsReducer,
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;