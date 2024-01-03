import noteForm from "../pageObjects/noteForm"

const baseUrl = "http://localhost:3000";

describe('FORM Test', () => {

  beforeEach(() => {
    cy.visit(baseUrl);
  })

  it("Expected to be added a new note", () => {
    const noteObj = new noteForm();
    noteObj.createNote("Title1", "Content1", "blue");
  });

  it("Expected to be seen error text as saving missing title and content input", () => {
    const noteObj = new noteForm();
    noteObj.clickAddNoteBtn();
    noteObj.enterTitle(" ");
    noteObj.enterContent("     ");
    noteObj.clickSaveBtn();
    noteObj.shouldExistErrorTextAndContainMessage("You must write title and content!");
  });

  it("Expected to be updated a note", () => {
    const noteObj = new noteForm(); 
    noteObj.createNote("Title1", "Content1", "red"); // create note
    noteObj.clickUpdateBtn(); // update that note
    noteObj.enterTitle(" Updated");
    noteObj.enterContent(" Updated"); 
    noteObj.clickSaveBtn();
  });

  
})
