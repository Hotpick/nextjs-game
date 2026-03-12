describe("Home", () => {
  it("should display the home page", () => {
    cy.visit("/");
    cy.contains("To get started, edit the page.tsx file");
  });

  it("should have a working button", () => {
    cy.visit("/");
    cy.contains("button", "Click me").should("be.visible");
  });
});
