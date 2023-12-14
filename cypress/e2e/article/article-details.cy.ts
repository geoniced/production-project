let currentArticleId = ``;

describe("User visits article detailed page", () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit(`articles`);
      cy.createArticle().then((article) => {
        currentArticleId = article.id;
        cy.visit(`articles/${currentArticleId}`);
      });
    });
  });

  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });

  it("User sees the contents of an article", () => {
    cy.getByTestId("ArticleDetails.Info").should("exist");
    cy.getByTestId("ArticleDetails.Title.Header").should(
      "have.text",
      "Article for tests"
    );
  });

  it("User sees recommedations", () => {
    cy.getByTestId("ArticleRecommendationsList").should("exist");
  });

  it("User can send a comment", () => {
    cy.getByTestId("ArticleDetails.Info").should("exist");
    cy.getByTestId("AddCommentForm").scrollIntoView();
    cy.addComment("text");
    cy.getByTestId("CommentCard.Content").should("have.length", 1);
  });

  it("User can send a recommendation/rating", () => {
    cy.getByTestId("ArticleDetails.Info").should("exist");
    cy.getByTestId("RatingCard").scrollIntoView();
    cy.setRate(4, "feedback");
    cy.get("[data-selected=true]").should("have.length", 4);
  });

  it("User can send a recommendation/rating (fixtures example)", () => {
    cy.intercept("GET", "**/articles/*", { fixture: "article-details.json" });
    cy.getByTestId("ArticleDetails.Info").should("exist");
    cy.getByTestId("RatingCard").scrollIntoView();
    cy.setRate(4, "feedback");
    cy.get("[data-selected=true]").should("have.length", 4);
  });
});
