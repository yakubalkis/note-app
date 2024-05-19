import { configureStore } from "@reduxjs/toolkit";
import { notesSlice } from "./notesSlice";


export const store = configureStore({
    reducer: {
        notesSlice: notesSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// expose store when run in Cypress
if (window.Cypress) {
    window['store'] = store
}