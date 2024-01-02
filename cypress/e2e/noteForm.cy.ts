import noteForm from "../pageObjects/noteForm"

const baseUrl = "http://localhost:3000";

describe('FORM Test', () => {

  beforeEach(() => {
    cy.visit(baseUrl);
  })

  it("has expected adding a new note", () => {
    const noteObj = new noteForm();
    noteObj.clickAddNoteBtn();
    noteObj.enterTitle("Title 1");
    noteObj.enterContent("Content 1");
    noteObj.clickRadioBtn("blue");
    noteObj.clickSaveBtn();
  });

  it("has expected to see error when trying to save missing data", () => {
    
  })
})