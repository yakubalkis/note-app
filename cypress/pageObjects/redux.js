class redux {
  checkNoteDataInRedux(title, content, color) {
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        expect(state.notesSlice.notes[0].title)
          .to.be.a("string")
          .and.equal(title);
        expect(state.notesSlice.notes[0].content)
          .to.be.a("string")
          .and.equal(content);
        expect(state.notesSlice.notes[0].color)
          .to.be.a("string")
          .and.equal(color);
      });
  }

  shouldNotExistNoteDataAfterDeleteInRedux() {
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        expect(state.notesSlice.notes).length(0);
      });
  }
}

export default redux;
