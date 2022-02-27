describe("My First Test", () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit("/");

    cy.findByRole("button", { name: /submit/i });
    cy.findByRole("heading", { name: /Leanne Graham/i });
  });
});
