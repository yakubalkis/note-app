
class noteForm {

    elements = {
        addNoteBtn: () => cy.get('[data-test-form="add-note-btn"]'),
        titleInput: () => cy.get('[data-test-form="title-input"]'),
        contentInput: () => cy.get('[data-test-form="content-input"]'),
        radioBtn: (color) => cy.get('[data-test-form="radio-btn"]').children(`.${color}`),
        saveBtn: () => cy.get('[data-test-form="submit-btn"]'),
        errorText: () => cy.get('[data-test-form="error-text"]'),
        updateBtn: () => cy.get('[data-test-form="update-btn"]'),
        deleteBtn: () => cy.get('[data-test-form="delete-btn"]'),
        noteCard: () => cy.get('[data-test-form="note-card"]'),
        noteTitleAndContent: () => cy.get('[data-test-form="note-title-and-content"]')
    }

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

    clickDeleteBtn() {
        this.elements.deleteBtn().click();
    }

    shouldNotExistNoteCard() {
        this.elements.noteCard().should('not.exist');
    }

    checkTitleAndContentText(title, content) {
        this.elements.noteTitleAndContent().children().first().contains(title);
        this.elements.noteTitleAndContent().children().eq(1).contains(content);
    }

}

export default noteForm;