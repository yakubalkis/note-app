import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import uniqueId from "lodash/uniqueId";
import {
  Note,
  addNote,
  setIsShowForm,
  updateNote,
} from "../features/notesSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import getDate from "../utils/getDate";
import BackIcon from "../img/icon-back.png";

export default function NoteForm() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notesSlice.notes);
  const [note, setNote] = useState({
    id: uniqueId(Math.floor(Math.random() * 100) + "_"), // set unique id
    title: "",
    content: "",
    color: "",
    date: getDate(), // set date
  });
  const [error, setError] = useState(false);
  const updatedNoteId = localStorage.getItem("updatedNoteId");

  useEffect(() => {
    if (updatedNoteId !== null) {
      const willBeUpdatedNote: Note = notes.find(
        (note) => note.id === updatedNoteId
      ) as Note;
      setNote({
        // set note state with data to be updated
        id: willBeUpdatedNote.id,
        title: willBeUpdatedNote.title,
        content: willBeUpdatedNote.content,
        color: willBeUpdatedNote.color,
        date: willBeUpdatedNote.date,
      });
    }
  }, []);

  function handleClickBackAndCancel() {
    dispatch(setIsShowForm(false)); // display NoteList component
    localStorage.removeItem("updatedNoteId"); // remove id anyway
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // get data from inputs and set it state
    const { name, value } = event.target;

    setNote((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleSaveBtn() {
    const title = note.title.replace(/\s+/g, " ").trim(); // remove junk spaces
    const content = note.content.replace(/\s+/g, " ").trim();

    if (title !== "" && content !== "") {
      // check if string is blank
      if (updatedNoteId === null) {
        // create new note
        dispatch(addNote(note));
      } else {
        // update note
        dispatch(updateNote(note));
        localStorage.removeItem("updatedNoteId"); // not need anymore
      }
      dispatch(setIsShowForm(false)); // after saving, close NoteForm, display NoteList component
    } else {
      setError(true);
    }
  }

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "60%",
          md: "60%",
          lg: "50%",
          xl: "50%",
        },
        minHeight: {
          xs: "100vh",
          sm: "100vh",
          md: "100vh",
          lg: "100vh",
          xl: "50vh",
        },
        bgcolor: "#CCD1D1",
      }}
      data-test-form="note-form-cmp"
    >
      <Stack direction="column" marginTop="2rem" marginLeft="1rem">
        <Stack>
          <Button
            data-test-form="back-btn"
            variant="outlined"
            size="small"
            sx={{
              width: {
                xs: "5rem",
                sm: "7rem",
                md: "7rem",
                lg: "8rem",
              },
              height: {
                xs: "2.5rem",
                sm: "3rem",
              },
              bgcolor: "white",
              color: "black",
            }}
            onClick={handleClickBackAndCancel}
          >
            <img src={BackIcon} style={{ marginRight: "1rem" }} />
            <Typography
              component="p"
              fontWeight={600}
              sx={{
                marginLeft: { xs: "-.9rem", sm: "0rem" },
                fontSize: { xs: ".8rem", sm: "1rem" },
              }}
            >
              Back
            </Typography>
          </Button>
        </Stack>

        <Typography
          data-test-form="form-header"
          sx={{
            marginTop: "2rem",
            color: "#03608E",
            fontFamily: "Georgia, serif;",
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
            },
          }}
          variant="h4"
        >
          {updatedNoteId === null
            ? "Create a new note..."
            : "Update your note..."}
        </Typography>

        <Stack
          spacing={2}
          sx={{ direction: "column", marginTop: "3rem", width: "80%" }}
        >
          <TextField
            data-test-form="title-input"
            label="Title"
            required
            sx={{ bgcolor: "white" }}
            name="title"
            value={note.title}
            onChange={handleChange}
          />
          <TextField
            data-test-form="content-input"
            label="Content"
            required
            sx={{ bgcolor: "white" }}
            name="content"
            value={note.content}
            onChange={handleChange}
          />
          {error && (
            <Typography data-test-form="error-text" color="error">
              You must write title and content!
            </Typography>
          )}
        </Stack>

        {updatedNoteId === null && (
          <Stack sx={{ marginTop: "2rem" }}>
            <FormLabel data-test-form="label-radioBtnBlock" id="color-label">
              Choose the color of your note
            </FormLabel>
            <RadioGroup
              data-test-form="radio-btn"
              className="radio-group"
              name="color"
              aria-labelledby="color-label"
              value={note.color}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                control={<Radio />}
                className="yellow"
                label="Yellow"
                value="yellow"
                sx={{ color: "#FDF604" }}
              />
              <FormControlLabel
                control={<Radio />}
                className="blue"
                label="Blue"
                value="blue"
                sx={{ color: "#001F89" }}
              />
              <FormControlLabel
                control={<Radio />}
                className="red"
                label="Red"
                value="red"
                sx={{ color: "#890000" }}
              />
            </RadioGroup>
          </Stack>
        )}
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <Button
            data-test-form="cancel-btn"
            variant="outlined"
            color="error"
            sx={{ bgcolor: "white" }}
            onClick={handleClickBackAndCancel}
          >
            Cancel
          </Button>
          <Button
            data-test-form="submit-btn"
            variant="outlined"
            color="success"
            sx={{ bgcolor: "white" }}
            onClick={handleSaveBtn}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
