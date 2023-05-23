import "cypress-localstorage-commands";

function userLogin(isParticipant, second) {
  const role = isParticipant ? "participant" : "researcher";

  cy.get(`[data-cy='button-visit-${role}-login']`).click();
  cy.get("[data-cy='main-component']").should("not.exist");
  cy.get("[data-cy='user-auth-page']");
  cy.get("[data-cy='button-switch-prompts']").click({ force: true });
  cy.get("[data-cy='input-email']").type(
    second ? "Admin@mail.com" : Cypress.env("username")
  );
  cy.get("[data-cy='input-password']").type(Cypress.env("password"));
  cy.get("[data-cy='button-user-auth']").click();
  cy.wait(2000);
  cy.get("[data-cy='main-component']");
  cy.get("[data-cy='user-auth-page']").should("not.exist");
}

function authRedirectionAndLogout(isParticipant) {
  const role = isParticipant ? "participant" : "researcher";

  cy.get(`[data-cy='button-visit-${role}-login']`).click();
  cy.get("[data-cy='main-component']");
  cy.get("[data-cy='user-auth-page']").should("not.exist");
  cy.get("[data-cy='navigation-settings']").click();
  cy.get("[data-cy='button-logout']").click();
  cy.get("[data-cy='main-component']").should("not.exist");
  cy.get("[data-cy='user-auth-page']");
}

Cypress.Commands.add("userLogin", (isParticipant, second) => {
  userLogin(isParticipant, second);
});

Cypress.Commands.add("authRedirectionAndLogout", (isParticipant) => {
  authRedirectionAndLogout(isParticipant);
});
