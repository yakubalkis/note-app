
class noteForm {

    elements = {
        addNoteBtn: () => cy.get('[data-test-form="add-note-btn"]'),
        titleInput: () => cy.get('[data-test-form="title-input"]'),
        contentInput: () => cy.get('[data-test-form="content-input"]'),
        radioBtn: (color) => cy.get('[data-test-form="radio-btn"]').children(`.${color}`),
        saveBtn: () => cy.get('[data-test-form="submit-btn"]'),
        errorText: () => cy.get('[data-test-form="error-text"]'),
        updateBtn: () => cy.get('[data-test-form="update-btn"]')
    }

    clickAddNoteBtn() {
        this.elements.addNoteBtn().click();
    }

    enterTitle(title) {
        this.elements.titleInput().type(title);
    }

    shouldTitleContain(title, index) {
        
    }

    enterContent(content) {
        this.elements.contentInput().type(content);
    }

    shouldContentContain(title, index) {

    }

    clickRadioBtn(color) {
        this.elements.radioBtn(color).click();
    }

    clickSaveBtn() {
        this.elements.saveBtn().click();
    }

    shouldExistErrorTextAndContainMessage(errorMessage) {
        this.elements.errorText().should('exist').and('contain', errorMessage);
    }

    clickUpdateBtn() {
        this.elements.updateBtn().click();
    }

    createNote(title, content, color) {
        this.clickAddNoteBtn();
        this.enterTitle(title);
        this.enterContent(content);
        this.clickRadioBtn(color);
        this.clickSaveBtn();
    }

}

export default noteForm;