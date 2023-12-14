const lastArticleName = "Экономическая статья";
const firstArticleName = "Golang news";

const searchValue = "Kotlin news";
const searchResultTitle = "Kotlin news";

describe("User visits articles page", () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit(`articles`);
    });
  });

  it("Articles are loaded successfully", () => {
    cy.getByTestId("ArticleList").should("exist");
    cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
  });

  it("Articles are loaded successfully with fixtures", () => {
    cy.intercept("GET", "**/articles[?]*", { fixture: "articles.json" });

    cy.getByTestId("ArticleList").should("exist");
    cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
  });

  it.skip("TEST SKIP EXAMPLE", () => {
    cy.getByTestId("ArticleList").should("exist");
    cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
    cy.getByTestId("abrakadabra").should("exist");
  });

  it("Sorting by title works", () => {
    cy.getByTestId("ArticleSortSelectType").click();
    cy.getByTestId("ArticleSortSelectType.select").select("title");
    cy.wait(1500);

    cy.getByTestId("ArticleListItem")
      .first()
      .find('[data-testid="ArticleListItemTitle.Paragraph"]')
      .should("have.text", firstArticleName);
  });

  it("Sorting by title in desc works", () => {
    cy.getByTestId("ArticleSortSelectType").click();
    cy.getByTestId("ArticleSortSelectType.select").select("title");
    cy.getByTestId("ArticleSortSelectBy.select").select("desc");
    cy.wait(1500);

    cy.getByTestId("ArticleListItem")
      .first()
      .find('[data-testid="ArticleListItemTitle.Paragraph"]')
      .should("have.text", lastArticleName);
  });

  it("Search works", () => {
    cy.getByTestId("ArticleSearchInput").type(searchValue);
    cy.wait(1500);

    cy.getByTestId("ArticleListItem")
      .first()
      .find('[data-testid="ArticleListItemTitle.Paragraph"]')
      .should("have.text", searchResultTitle);
  });

  it("Tabs work", () => {
    cy.getByTestId("ArticleTypeTabs.HEALTH").click();
    cy.wait(1500);

    cy.getByTestId("ArticleListItem").should("have.length", 2);

    cy.getByTestId("ArticleListItem").each(($item) => {
      cy.wrap($item)
        .find('[data-testid="ArticleListItem.Types.Paragraph"]')
        .should("contain.text", "HEALTH");
    });
  });
});
