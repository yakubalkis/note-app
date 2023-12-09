import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Note = {
    id: string;
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
            localStorage.setItem("notes", JSON.stringify(state.notes));
        },
        deleteNote(state, action: PayloadAction<string>) {
            state.notes = state.notes.filter((note) => {
                return note.id !== action.payload;
            });
            localStorage.setItem("notes", JSON.stringify(state.notes));
        },
        setNotesFromLocalStorage(state) {
            const notes = localStorage.getItem("notes");
            if(notes !== null) {
                state.notes = JSON.parse(notes);
            }
        },
    }
});

export const {setIsShowForm, addNote, setNotesFromLocalStorage, deleteNote} = notesSlice.actions;
