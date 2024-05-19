import NoteList from "../../src/components/NoteList";
import noteForm from "../pageObjects/noteForm";
import note from "../pageObjects/note";

describe("NoteList.cy.tsx", () => {
  it("Expected to not seen any notes at first", () => {
    cy.mount(<NoteList />);

    const noteFormObj = new noteForm();
    const noteObj = new note();

    noteFormObj.elements.addNoteBtn().should("contain.text", "Add Note");
    noteObj.elements.noteCard().should("not.exist");
    noteFormObj.elements
      .notesList()
      .children()
      .should("contain.text", "There are no notes to show...");
  });
});
