import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Note = {
    title: string;
    content: string;
    color: string;
    date: string;
};

type NotesState = {
    isShowForm: boolean;
    notes: Note[];
};

const initialState : NotesState = {
    isShowForm: false,
    notes: []
};

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setIsShowForm(state, action: PayloadAction<boolean>) {
            state.isShowForm = action.payload;
        },
        addNote(state, action: PayloadAction<Note>) {
            state.notes = [action.payload, ...state.notes];
        },

    }
});

export const {setIsShowForm, addNote} = notesSlice.actions;
