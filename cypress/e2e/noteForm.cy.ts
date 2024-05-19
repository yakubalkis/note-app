import note from "../pageObjects/note";
import noteForm from "../pageObjects/noteForm";
import redux from "../pageObjects/redux";

describe("FORM Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Expected to be added a new note", () => {
    const noteFormObj = new noteForm();
    const noteObj = new note();
    const reduxObj = new redux();

    noteFormObj.createNote("Title1", "Content1", "blue");
    noteObj.checkTitleAndContentText("Title1", "Content1");

    reduxObj.checkNoteDataInRedux("Title1", "Content1", "blue");
  });

  it("Expected to be seen error text as saving missing title and content input", () => {
    const noteFormObj = new noteForm();
    noteFormObj.clickAddNoteBtn();
    noteFormObj.enterTitle(" ");
    noteFormObj.enterContent("     ");
    noteFormObj.clickSaveBtn();
    noteFormObj.shouldExistErrorTextAndContainMessage(
      "You must write title and content!"
    );
  });

  it("Expected to be updated a note", () => {
    const noteFormObj = new noteForm();
    const noteObj = new note();
    const reduxObj = new redux();

    noteFormObj.createNote("Title1", "Content1", "red"); // create note
    noteObj.clickUpdateBtn(); // update that note
    noteFormObj.enterTitle(" Updated");
    noteFormObj.enterContent(" Updated");
    noteFormObj.clickSaveBtn();
    noteObj.checkTitleAndContentText("Title1 Updated", "Content1 Updated");

    reduxObj.checkNoteDataInRedux("Title1 Updated", "Content1 Updated", "red");
  });

  it("Expected to be deleted a note", () => {
    const noteFormObj = new noteForm();
    const noteObj = new note();
    const reduxObj = new redux();

    noteFormObj.createNote("Title1", "Content1", "red"); // create note
    noteObj.clickDeleteBtn();
    noteObj.shouldNotExistNoteCard(); // after delete, note card shouldn't be displayed.

    reduxObj.shouldNotExistNoteDataAfterDeleteInRedux();
  });

  it("Expected to not render NoteForm after click back or cancel btn in NoteForm component.", () => {
    const noteFormObj = new noteForm();
    noteFormObj.clickAddNoteBtn();
    noteFormObj.clickBackBtn();
    noteFormObj.elements.noteFormCmp().should("not.exist");

    noteFormObj.clickAddNoteBtn();
    noteFormObj.clickCancelBtn();
    noteFormObj.elements.noteFormCmp().should("not.exist");
  });
});
