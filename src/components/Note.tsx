import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "../features/hooks";
import { Note as NoteType, deleteNote, setIsShowForm } from "../features/notesSlice";
import PinIcon from "../img/pin-icon.png"; 
import TrashIcon from "../img/icons-trash.png";
import WriteIcon from "../img/icons-write.png";


const red = "#890000";
const blue = "#001F89";
const yellow = "#FDF604 ";

export default function Note({id, title, content, color, date}: NoteType) {
    const dispatch = useAppDispatch();


    function handleDelete(id:string) {
        dispatch(deleteNote(id));
    }

    function handleUpdate(id:string) {
       dispatch(setIsShowForm(true)); // display NoteForm
       localStorage.setItem("updatedNoteId", id); // set the id of the note to be updated to the local storage
    }                                             // this id will be used in NoteForm component to populate the form with data(update process)

    return(
        <>
        <ListItem>
            <ListItemIcon sx={{marginBottom: "1.5rem"}}>
                <ListItemAvatar>
                    <Avatar variant="square" src={PinIcon} sx={{bgcolor: color==="red" ? red : color==="blue" ? blue : color==="yellow" ? yellow : "" }} />
                </ListItemAvatar>
            </ListItemIcon>
            <ListItemText 
                sx={{marginBottom: "2.5rem", overflow:"hidden"}}
                primary={<Typography sx={{fontWeight:"900"}}>{title}</Typography>}
                secondary={content} 
                secondaryTypographyProps={{sx: {fontFamily: "Inter, sans-serif;"}}}
            />
            <Typography sx={{position:"absolute", bottom: "0",opacity:"0.5",fontSize:"0.9rem"}}>{date}</Typography>
            <Stack direction="column" spacing={1} sx={{marginLeft: "5px"}}>
                <Button variant="contained" color="error" size="small" onClick={() => handleDelete(id)}>
                    <img style={{width: "20px"}} src={TrashIcon} />
                </Button>
                <Button variant="contained" color="success" size="small" onClick={() => handleUpdate(id)}>
                    <img style={{width: "20px"}} src={WriteIcon} />
                </Button>
            </Stack> 
        </ListItem>
        <Divider/>
        </>
    )
}