import { selectByTestId } from "../../helpers/selectByTestId";

describe("Routing", () => {
  describe("User is not authorized", () => {
    it("Navigates to the home page", () => {
      cy.visit("/");
      cy.get(selectByTestId("MainPage")).should("exist");
    });

    it("Navigates to the profile page", () => {
      cy.visit("/profile/1");
      cy.get(selectByTestId("MainPage")).should("exist");
    });

    it("Navigates to not existing page", () => {
      cy.visit("/someunexistingroute");
      cy.get(selectByTestId("NotFoundPage")).should("exist");
    });
  });
  describe("User is authorized", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Navigates to the profile page", () => {
      cy.visit("/profile/1");
      cy.get(selectByTestId("ProfilePage")).should("exist");
    });

    it("Navigates to the articles page", () => {
      cy.visit("/articles");
      cy.get(selectByTestId("ArticlesPage")).should("exist");
    });
  });
});
