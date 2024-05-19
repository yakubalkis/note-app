import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { setIsShowForm } from "../features/notesSlice";
import Note from "./Note";
import NotesIcon from "../img/icons8-notes.png";

export default function NoteList() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notesSlice.notes);

  function handleClickAddBtn() {
    dispatch(setIsShowForm(true)); // display NoteForm
  }

  const Notes = notes.map((note) => {
    return (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        content={note.content}
        color={note.color}
        date={note.date}
      />
    );
  });

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "60%",
          md: "60%",
          lg: "50%",
          xl: "40%",
        },
        minHeight: "100vh",
        bgcolor: "#D7DBDD",
      }}
      data-test-list="note-list-cmp"
    >
      <Toolbar sx={{ bgcolor: "hsl(207, 26%, 17%)", color: "white" }}>
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Stack direction="row" display="flex" alignItems="center">
            <Avatar src={NotesIcon} />
            <Typography
              fontFamily="Georgia, serif;"
              fontWeight="600"
              sx={{ fontSize: { xs: ".9rem", sm: "1.5rem", md: "1.7rem" } }}
            >
              My Notes
            </Typography>
          </Stack>

          <Stack>
            <Button
              data-testid="add-note-btn"
              data-test-form="add-note-btn"
              color="primary"
              variant="contained"
              sx={{
                textTransform: "inherit",
                fontWeight: "700",
                fontSize: { xs: ".7rem", sm: ".8rem", md: "1rem" },
                marginTop: ".4rem",
              }}
              onClick={handleClickAddBtn}
            >
              Add Note
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
      <Divider />
      <List
        style={{ maxHeight: "100vh", overflow: "auto" }}
        data-test-list="notes-list"
      >
        {notes.length > 0 ? (
          Notes
        ) : (
          <Typography sx={{ textAlign: "center" }}>
            There are no notes to show...
          </Typography>
        )}
      </List>
    </Box>
  );
}
