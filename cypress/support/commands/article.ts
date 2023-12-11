import { Article } from "../../../src/entities/Article";

const testArticle = {
  title: "Article for tests",
  subtitle: "Subtitle test",
  img: "https://www.rust-lang.org/static/images/rust-social-wide.jpg",
  views: 999999,
  userId: "1",
  createdAt: "10.08.2022",
  type: ["IT"],
  blocks: [],
};

export const createArticle = (article?: Article) => {
  return cy
    .request({
      method: "POST",
      url: `http://localhost:8000/articles`,
      headers: {
        Authorization: `Authorization`,
      },
      body: article ?? testArticle,
    })
    .then((resp) => resp.body);
};

export const removeArticle = (articleId: string) => {
  return cy.request({
    method: "DELETE",
    url: `http://localhost:8000/articles/${articleId}`,
    headers: {
      Authorization: `Authorization`,
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
