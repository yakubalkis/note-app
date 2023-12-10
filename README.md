# Note App - (TS + React + Redux + MUI)
This project is a note application which user can create, delete and update the notes.

Live Link: https://note-app-alkis.netlify.app/

## Technologies used
• Used TypeScript, React, Redux Toolkit and MUI.

## Run in local
• Download repository,<br>
```> cd [path folder]``` , <br>
```> npm install```, <br>
```> npm start``` <br>

## Business Logic

### 1. Project Structure
```bash
.
├── src
    ├──  components       # component files (Note, NoteList, NoteForm)
    ├──  features         # redux files (store,hooks,notesSlice)
    ├──  img              # icons
    ├──  utils            # utilities (getDate)
├── App.tsx                   
├── index.tsx                     
├── ...                    
```

<hr>

### 2. Redux Toolkit Usage
• It's placed in "features" folder. It includes the files store.ts, notesSlice.ts and hooks.ts.<br>

• In ```store.ts```, I set up a general Redux store. Used ```configureStore()``` provided by redux toolkit to create a redux store. Given ```notesSlice.reducer``` as a reducer of notesSlice to that configureStore. <br>
```js
export const store = configureStore({
    reducer: {
        notesSlice: notesSlice.reducer
    }
});
```

• I preferred to use my own versions of useDispatch and useSelector hooks for extra type safety. In order to do that, I exported ```RootState``` and ```AppDispatch``` types from ```store.ts```.
```js
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

• In ```hooks.ts```, I created two custom hooks which are ```useAppDispatch``` and ```useAppSelector```. In order to create these hooks, I used RootState and AppDispatch types.
```js
type DispatchFunction = () => AppDispatch;

export const useAppDispatch: DispatchFunction = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

• In ```notesSlice.ts```, I created a slice. The state contains of ```isShowForm``` variable that type is boolean and ```notes``` array that type is Note.<br>
 ```notes``` array is array of notes. 
 ```js
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
```

```isShowForm``` is used to display ```NoteList``` and ```NoteForm``` components conditionally. (Code block is in App.tsx)
```js
{!isShowForm ? <NoteList /> : <NoteForm />}
```

#### - Actions in reducer
• ```setIsShowForm```: Used to set value to isShowForm state.
```js
setIsShowForm(state, action: PayloadAction<boolean>) {
            state.isShowForm = action.payload;
}
```

• ```addNote```: Used to add new note, new note is added to top of the note list. After adding, notes are set to local storage.
```js
addNote(state, action: PayloadAction<Note>) {
            state.notes = [action.payload, ...state.notes]; // add new note to the top of list
            localStorage.setItem("notes", JSON.stringify(state.notes));
}
```

• ```updateNote```: Used to update note, it takes updated note as a parameter. After updating, notes are set to local storage again.
```js
updateNote(state, action: PayloadAction<Note>) {
            state.notes = state.notes.map((note) => {
                if(note.id !== action.payload.id) {
                    return note;
                } else { // update item
                    return action.payload;
                }
            });
            localStorage.setItem("notes", JSON.stringify(state.notes));
}
```

• ```deleteNote```: Used to delete note, it takes id of note as a parameter. After deleting, notes are set to local storage again.
```js
deleteNote(state, action: PayloadAction<string>) {
            state.notes = state.notes.filter((note) => {
                return note.id !== action.payload;
            });
            localStorage.setItem("notes", JSON.stringify(state.notes));
}
```

• ```setNotesFromLocalStorage```: Used to get notes from local storage, then set it notes state. It is used to prevent data from being lost after refreshing the page.
```js
setNotesFromLocalStorage(state) {
            const notes = localStorage.getItem("notes");
            if(notes !== null) {
                state.notes = JSON.parse(notes);
            }
}
```
<hr>

### 3. Components

#### - ```Note.tsx :```
• It takes id,title,content,color and date as a prop. Delete and Update buttons are handled in this component.
```js
export default function Note({id, title, content, color, date}: NoteType) {
    const dispatch = useAppDispatch();


    function handleDelete(id:string) {
        dispatch(deleteNote(id));
    }

    function handleUpdate(id:string) {
       dispatch(setIsShowForm(true)); // display NoteForm
       localStorage.setItem("updatedNoteId", id); // set the id of the note to be updated to the local storage
    }                                             // this id will be used in NoteForm component to populate the form with data(update process)
...
```

#### - ```NoteForm.tsx :```
• It is used both to add and update a note. If ```updatedNoteId``` is null, adding process is invoked. If it isn't null, updating process is invoked.
##### Adding process:
Before the saving process, note state properties are set with data comes from inputs in ```handleChange``` function.
```js
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;

        setNote(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        });
}
```
When "Save" button is clicked, handleSaveBtn function is invoked. In addding process, because 'updatedNoteId' will be null, addNote function is invoked.
```js
function handleSaveBtn() {
        const title = note.title.replace(/\s+/g,' ').trim(); // remove junk spaces
        const content = note.content.replace(/\s+/g,' ').trim();
       
        if(title !== "" && content !== "") { // check if string is blank
            if(updatedNoteId === null) { // create new note
                dispatch(addNote(note));
            } else { // update note
                dispatch(updateNote(note));
                localStorage.removeItem("updatedNoteId"); // not need anymore
            }
            dispatch(setIsShowForm(false)); // after saving, close NoteForm, display NoteList component
        } else {
            setError(true);
        }
}
```

##### Updating process:
When NoteForm is rendered first, a checking are made with useEffect. If updatedNoteId is not null, I take note data from notes state with that id. After that, note state are set with that data. In this way, form are populated with data to be updated.
```js
useEffect(() => {
        if(updatedNoteId !== null) {
            const willBeUpdatedNote : Note = notes.find((note) => note.id === updatedNoteId) as Note;
            setNote({ // set note state with data to be updated
                id: willBeUpdatedNote.id,
                title: willBeUpdatedNote.title,
                content:willBeUpdatedNote.content,
                color: willBeUpdatedNote.color,
                date: willBeUpdatedNote.date
            });
        }
}, []);
```
Also, when "Save" button is clicked, handleSaveBtn function is invoked. Because updatedNoteId is not null, updateNote function is invoked.
```js
function handleSaveBtn() {
            ...
            } else { // update note
                dispatch(updateNote(note));
                localStorage.removeItem("updatedNoteId"); // not need anymore
            }
            dispatch(setIsShowForm(false)); // after saving, close NoteForm, display NoteList component
            ...
}
```

#### - ```NoteList.tsx :```
It uses notes state to reuse Note component.
```js
const Notes = notes.map((note) => {
        return(
            <Note key={note.id}
                id= {note.id}
                title={note.title} 
                content={note.content} 
                color={note.color} 
                date={note.date} 
            />
        )
});
```
Then it displays it in List component.
```html
...
<List style={{maxHeight: '100vh', overflow:'auto'}}>
   {notes.length > 0 ? Notes : <Typography sx={{textAlign:"center"}}>There are no notes to show...</Typography>}
</List>
...
```

### 4. Utils (getDate.ts)
It contains of getDate function, it returns the current date.
```js
export default function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}
```








 
 

