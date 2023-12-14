import { User } from '../../../src/entities/User';

export const updateProfile = (firstName: string, lastName: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.FirstName').clear().type(firstName);
  cy.getByTestId('ProfileCard.LastName').clear().type(lastName);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: {
      Authorization: `Authorization`,
    },
    body: {
      id: '4',
      firstname: 'Test',
      lastname: 'User',
      age: 25,
      currency: 'EUR',
      country: 'Russia',
      city: 'Bishkek',
      username: 'testuser',
      avatar:
        'https://www.bleepstatic.com/content/hl-images/2022/09/30/cyber-hacker.jpg',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstName: string, lastName: string): Chainable<User>;
      resetProfile(profileId: string): Chainable<User>;
    }
  }
}
