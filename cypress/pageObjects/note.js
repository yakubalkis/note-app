class note {
  elements = {
    updateBtn: () => cy.get('[data-test-note="update-btn"]'),
    deleteBtn: () => cy.get('[data-test-note="delete-btn"]'),
    noteCard: () => cy.get('[data-test-note="note-card"]'),
    noteTitleAndContent: () =>
      cy.get('[data-test-note="note-title-and-content"]'),
    noteDateText: () => cy.get('[data-test-note="note-date-text"]'),
  };

  clickUpdateBtn() {
    this.elements.updateBtn().click();
  }

  shouldNotExistNoteCard() {
    this.elements.noteCard().should("not.exist");
  }

  checkTitleAndContentText(title, content) {
    this.elements.noteTitleAndContent().children().first().contains(title);
    this.elements.noteTitleAndContent().children().eq(1).contains(content);
  }

  clickDeleteBtn() {
    this.elements.deleteBtn().click();
  }
}

export default note;
