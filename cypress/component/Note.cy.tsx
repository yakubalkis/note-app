import Note from "../../src/components/Note";
import { Note as NoteType } from "../../src/features/notesSlice";
import getDate from "../../src/utils/getDate";
import note from "../pageObjects/note";

const noteData: NoteType = {
  id: "1x",
  title: "Title 1",
  content: "Content 1",
  color: "red",
  date: getDate(),
};

describe("Note.cy.tsx", () => {
  it("Expected to be rendered properly for Note component with prop", () => {
    cy.mount(
      <Note
        id={noteData.id}
        title={noteData.title}
        content={noteData.content}
        color={noteData.color}
        date={noteData.date}
      />
    );
    const noteObj = new note();
    noteObj.checkTitleAndContentText(noteData.title, noteData.content);
    noteObj.elements.noteDateText().should("contain.text", noteData.date);
  });
});
