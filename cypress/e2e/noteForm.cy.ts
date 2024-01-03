import noteForm from "../pageObjects/noteForm"

const baseUrl = "http://localhost:3000";

describe('FORM Test', () => {

  beforeEach(() => {
    cy.visit(baseUrl);
  })

  it("Expected to be added a new note", () => {
    const noteObj = new noteForm();
    noteObj.clickAddNoteBtn();
    noteObj.enterTitle("Title 1");
    noteObj.enterContent("Content 1");
    noteObj.clickRadioBtn("red");
    noteObj.clickSaveBtn();
  });

  it("Expected to be seen error text as saving missing title and content input", () => {
    const noteObj = new noteForm();
    noteObj.clickAddNoteBtn();
    noteObj.enterTitle(" ");
    noteObj.enterContent("     ");
    noteObj.clickSaveBtn();
    noteObj.shouldExistErrorText();
  });

  
})
