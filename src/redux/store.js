import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import authSlice from "./slice/authSlice";
import taskSlice from "./slice/taskSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSlice.name]: authSlice.reducer,
    [taskSlice.name]: taskSlice.reducer,
  },
  middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
});

export default store;
