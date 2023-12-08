import { Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import BackIcon from "../img/icon-back.png";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { addNote, setIsShowForm } from "../features/notesSlice";
import { useState } from "react";
import getDate from "../utils/getDate";


export default function NoteForm() {
    const dispatch = useAppDispatch();
    const notes = useAppSelector(state => state.notesSlice.notes);
    const [note, setNote] = useState({title: "", content:"", color: "", date: getDate()});
    const [error, setError] = useState(false);

    function handleClickBackAndCancel() {
        dispatch(setIsShowForm(false));
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;

        setNote(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        });
    }

    function handleSaveBtn() {
        const title = note.title.replace(/\s+/g,' ').trim(); // remove junk spaces
        const content = note.content.replace(/\s+/g,' ').trim();
       
        if(title !== "" && content !== "") { // check if string is blank
            setError(false);
            dispatch(addNote(note));
            dispatch(setIsShowForm(false));
        } else {
            setError(true);
        }
        
    }


    return(
        <Box sx={{width:"50%", minHeight:"100vh", bgcolor: "#CCD1D1"}}>
                <Stack direction="column" marginTop="2rem" marginLeft="1rem">
                    <Stack>
                        <Button variant="outlined" size="small" sx={{width: "8rem", height:"3rem", bgcolor:"white", color:"black"}} onClick={handleClickBackAndCancel}>
                            <img src={BackIcon} style={{marginRight: "1rem"}} />
                            <Typography component="p" fontWeight={600}>Back</Typography>
                        </Button>
                    </Stack>
                    <Typography sx={{marginTop: "2rem", color:"#03608E" ,fontFamily:"Georgia, serif;"}} variant="h4">Create a new note...</Typography>
                    <Stack spacing={2} sx={{direction:"column", marginTop:"3rem", width:"80%"}}>
                        <TextField label="Title" required sx={{bgcolor: "white"}} name="title" value={note.title} onChange={handleChange} />
                        <TextField label="Content" required sx={{bgcolor: "white"}} name="content" value={note.content} onChange={handleChange} />
                        {error && <Typography color="error">You must write title and content!</Typography>}
                    </Stack>
                    <Stack sx={{marginTop: "2rem"}}>
                            <FormLabel id="color-label"
                                >Choose the color of your note
                            </FormLabel>
                            <RadioGroup 
                                name="color" 
                                aria-labelledby="color-label"
                                value={note.color}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel control={<Radio />} label="Yellow" value="yellow" sx={{color:"#FDF604"}} />
                                <FormControlLabel control={<Radio />} label="Blue" value="blue" sx={{color:"#001F89"}} />
                                <FormControlLabel control={<Radio />} label="Red" value="red" sx={{color:"#890000"}} />
                            </RadioGroup>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{marginTop: "2rem"}}>
                        <Button 
                            variant="outlined" 
                            color="error" 
                            sx={{bgcolor:"white"}} 
                            onClick={handleClickBackAndCancel}
                        >Cancel
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="success" 
                            sx={{bgcolor:"white"}} 
                            onClick={handleSaveBtn}
                        >Save
                        </Button>
                    </Stack>
                </Stack>
        </Box>
    )
}