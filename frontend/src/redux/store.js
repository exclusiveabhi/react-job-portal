import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/appSlice";

export const store = configureStore({
    reducer: {
        app: appReducer
    }
});