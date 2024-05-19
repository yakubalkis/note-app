import NoteForm from "../../src/components/NoteForm";
import noteForm from "../pageObjects/noteForm";

describe("NoteForm.cy.tsx", () => {
  it("Expected form elements and their texts should exist", () => {
    cy.mount(<NoteForm />);
    const noteFormObj = new noteForm();
    noteFormObj.elements
      .backBtn()
      .should("exist")
      .should("contain.text", "Back");
    noteFormObj.elements
      .formHeader()
      .should("exist")
      .should("contain.text", "Create a new note...");
    noteFormObj.elements
      .titleInput()
      .should("exist")
      .children()
      .should("contain.text", "Title"); // check placeholder of title input
    noteFormObj.elements
      .contentInput()
      .should("exist")
      .children()
      .should("contain.text", "Content"); // check placeholder of content input
    noteFormObj.elements
      .labelOfRadioBtnsBlock()
      .should("exist")
      .should("contain.text", "Choose the color of your note");
    noteFormObj.elements
      .cancelBtn()
      .should("exist")
      .should("contain.text", "Cancel");
    noteFormObj.elements
      .saveBtn()
      .should("exist")
      .should("contain.text", "Save");
    noteFormObj.shouldExistRadioButtons("yellow", "red", "blue");
  });
});
