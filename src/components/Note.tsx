import { Avatar, Box, Button, Divider, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import PinIcon from "../img/pin-icon.png"; 
import TrashIcon from "../img/icons-trash.png";
import WriteIcon from "../img/icons-write.png";
import { Note as NoteType } from "../features/notesSlice";


const red = "#890000";
const blue = "#001F89";
const yellow = "#FDF604 ";

export default function Note({title, content, color, date}: NoteType) {
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
                <Button variant="contained" color="error" size="small">
                    <img src={TrashIcon} />
                </Button>
                <Button variant="contained" color="success" size="small">
                    <img src={WriteIcon} />
                </Button>
            </Stack> 
        </ListItem>
        <Divider/>
        </>
    )
}