import React, { useEffect } from 'react';
import NoteList from './components/NoteList';
import { Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from './features/hooks';
import NoteForm from './components/NoteForm';
import { setNotesFromLocalStorage } from './features/notesSlice';

function App() {
  const isShowForm = useAppSelector(state => state.notesSlice.isShowForm);
  const dispatch = useAppDispatch();

  useEffect(() => { // after refresh, this is invoked once time
    dispatch(setNotesFromLocalStorage());
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
