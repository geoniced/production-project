import { User } from "../../../src/entities/User";
import { USER_LOCAL_STORAGE_KEY } from "../../../src/shared/const/localStorage";
import { selectByTestId } from "../../helpers/selectByTestId";

export const login = (
  username: string = "testuser",
  password: string = "123"
) => {
  return cy
    .request({
      method: "POST",
      url: `http://localhost:8000/login`,
      body: {
        username,
        password,
      },
    })
    .then(({ body }) => {
      window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(body));
      return body;
    });
};

export const getByTestId = (testId: string) => {
  return cy.get(selectByTestId(testId));
};

export const findByTestId = (testId: string) => {
  return cy.find(selectByTestId(testId));
};

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<User>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      findByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
