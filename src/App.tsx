import React from 'react';
import NoteList from './components/NoteList';
import { Stack } from '@mui/material';
import { useAppSelector } from './features/hooks';
import NoteForm from './components/NoteForm';

function App() {
  const isShowForm = useAppSelector(state => state.notesSlice.isShowForm);
  
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
