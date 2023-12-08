import { Avatar, Box, Button, Divider, List, Stack, Toolbar, Typography } from "@mui/material";
import Note from "./Note";
import NotesIcon from "../img/icons8-notes.png";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { setIsShowForm } from "../features/notesSlice";


export default function NoteList() {
    const dispatch = useAppDispatch();
    const notes = useAppSelector(state => state.notesSlice.notes);

    function handleClickAddBtn() {
        dispatch(setIsShowForm(true));
    }

    const Notes = notes.map((note,index) => {
        return(
            <Note key={index} title={note.title} content={note.content} color={note.color} date={note.date} />
        )
    })
    // notelist overflow olayini unutma
    return(
        <Box width="50%" bgcolor="#D7DBDD" minHeight="100vh">
            <Toolbar sx={{bgcolor: "hsl(207, 26%, 17%)", color: "white"}}>
                <Stack direction="row" justifyContent="space-between" width="100%">                
                    <Stack direction="row" display="flex" alignItems="center">
                        <Avatar src={NotesIcon}/>
                        <Typography fontFamily="Georgia, serif;" fontSize="1.7rem" fontWeight="600">My Notes</Typography>
                    </Stack>
                    <Stack>
                        <Button color="primary" variant="contained" sx={{textTransform: "inherit",fontWeight:"700",fontSize:"1rem"}} onClick={handleClickAddBtn}>Add Note</Button>
                    </Stack> 
                </Stack>
            </Toolbar>
                <Divider />
            <List style={{maxHeight: '100vh', overflow:'auto'}}>
                {Notes}
            </List>
        </Box>
    )
}