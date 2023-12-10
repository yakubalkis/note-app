import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from './features/hooks';
import { setNotesFromLocalStorage } from './features/notesSlice';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  const isShowForm = useAppSelector(state => state.notesSlice.isShowForm); // to use for conditional rendering
  const dispatch = useAppDispatch();

  useEffect(() => { // after refresh, this is invoked once time
    dispatch(setNotesFromLocalStorage()); // get notes from local and set data at redux
    localStorage.removeItem("updatedNoteId"); // remove item - (user can refresh the page when updates the note)
  }, []);

  return (
    <Stack className="App" 
          display="flex"
          justifyContent="center" 
          alignItems="center"
          minHeight="100vh"
          flexDirection="column"
          overflow="hidden"          
          >
      {!isShowForm ? <NoteList /> : <NoteForm />}
    </Stack> 
  );
}

export default App;
