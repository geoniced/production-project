let profileId: string = '';

describe('User enters profile page', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${profileId}`);
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  });

  it('Profile loads successfully', () => {
    cy.getByTestId('ProfileCard.FirstName').should('have.value', 'Test');
  });
  it('User edits his profile', () => {
    const testFirstName = 'NewFirstName';
    const testLastName = 'NewLastName';

    cy.updateProfile(testFirstName, testLastName);
    cy.getByTestId('ProfileCard.FirstName').should('have.value', testFirstName);
    cy.getByTestId('ProfileCard.LastName').should('have.value', testLastName);
  });
});
