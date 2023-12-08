import { configureStore } from "@reduxjs/toolkit";
import { notesSlice } from "./notesSlice";


export const store = configureStore({
    reducer: {
        notesSlice: notesSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;