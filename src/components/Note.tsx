import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import PinIcon from "../img/pin-icon.png"; 
import TrashIcon from "../img/icons-trash.png";
import WriteIcon from "../img/icons-write.png";
import { Note as NoteType, deleteNote, setIsShowForm } from "../features/notesSlice";
import { useAppDispatch } from "../features/hooks";


const red = "#890000";
const blue = "#001F89";
const yellow = "#FDF604 ";

export default function Note({id, title, content, color, date}: NoteType) {
    const dispatch = useAppDispatch();


    function handleDelete(id:string) {
        dispatch(deleteNote(id));
    }

    function handleUpdate(id:string) {
       dispatch(setIsShowForm(true));
       localStorage.setItem("updatedNoteId", id); 
    }

    return(
        <>
        <ListItem>
            <ListItemIcon>
                <ListItemAvatar>
                    <Avatar variant="square" src={PinIcon} sx={{bgcolor: color}} />
                </ListItemAvatar>
            </ListItemIcon>
            <ListItemText 
                primary={<Typography sx={{fontWeight:"900"}}>{title}</Typography>}
                secondary={content} 
                secondaryTypographyProps={{sx: {fontFamily: "Inter, sans-serif;"}}}
            />
            <Typography sx={{position:"absolute", bottom: "0",opacity:"0.5",fontSize:"0.9rem"}}>{date}</Typography>
            <Stack direction="column" spacing={1} sx={{marginLeft: "5px"}}>
                <Button variant="contained" color="error" size="small" onClick={() => handleDelete(id)}>
                    <img src={TrashIcon} />
                </Button>
                <Button variant="contained" color="success" size="small" onClick={() => handleUpdate(id)}>
                    <img src={WriteIcon} />
                </Button>
            </Stack> 
        </ListItem>
        <Divider/>
        </>
    )
}