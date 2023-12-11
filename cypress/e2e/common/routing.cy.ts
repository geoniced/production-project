describe("Routing", () => {
  describe("User is not authorized", () => {
    it("Navigates to the home page", () => {
      cy.visit("/");
      cy.getByTestId("MainPage").should("exist");
    });

    it("Navigates to the profile page", () => {
      cy.visit("/profile/1");
      cy.getByTestId("MainPage").should("exist");
    });

    it("Navigates to not existing page", () => {
      cy.visit("/someunexistingroute");
      cy.getByTestId("NotFoundPage").should("exist");
    });
  });
  describe("User is authorized", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Navigates to the profile page", () => {
      cy.visit("/profile/1");
      cy.getByTestId("ProfilePage").should("exist");
    });

    it("Navigates to the articles page", () => {
      cy.visit("/articles");
      cy.getByTestId("ArticlesPage").should("exist");
    });
  });
});
