class noteForm {
  elements = {
    addNoteBtn: () => cy.get('[data-test-form="add-note-btn"]'),
    titleInput: () => cy.get('[data-test-form="title-input"]'),
    contentInput: () => cy.get('[data-test-form="content-input"]'),
    radioBtn: (color) =>
      cy.get('[data-test-form="radio-btn"]').children(`.${color}`),
    saveBtn: () => cy.get('[data-test-form="submit-btn"]'),
    errorText: () => cy.get('[data-test-form="error-text"]'),
    backBtn: () => cy.get('[data-test-form="back-btn"]'),
    formHeader: () => cy.get('[data-test-form = "form-header"]'),
    labelOfRadioBtnsBlock: () =>
      cy.get('[data-test-form = "label-radioBtnBlock"]'),
    cancelBtn: () => cy.get('[data-test-form = "cancel-btn"]'),
    notesList: () => cy.get('[data-test-list = "notes-list"]'),
    noteFormCmp: () => cy.get('[data-test-form = "note-form-cmp"]'),
    noteListCmp: () => cy.get('[data-test-list = "note-list-cmp"]'),
  };

  clickAddNoteBtn() {
    this.elements.addNoteBtn().click();
  }

  enterTitle(title) {
    this.elements.titleInput().type(title);
  }

  enterContent(content) {
    this.elements.contentInput().type(content);
  }

  clickRadioBtn(color) {
    this.elements.radioBtn(color).click();
  }

  clickSaveBtn() {
    this.elements.saveBtn().click();
  }

  shouldExistErrorTextAndContainMessage(errorMessage) {
    this.elements.errorText().should("exist").and("contain", errorMessage);
  }

  createNote(title, content, color) {
    this.clickAddNoteBtn();
    this.enterTitle(title);
    this.enterContent(content);
    this.clickRadioBtn(color);
    this.clickSaveBtn();
  }

  shouldExistRadioButtons(color1, color2, color3) {
    this.elements.radioBtn(color1).should("exist");
    this.elements.radioBtn(color2).should("exist");
    this.elements.radioBtn(color3).should("exist");
  }

  clickBackBtn() {
    this.elements.backBtn().click();
  }

  clickCancelBtn() {
    this.elements.cancelBtn().click();
  }
}

export default noteForm;
