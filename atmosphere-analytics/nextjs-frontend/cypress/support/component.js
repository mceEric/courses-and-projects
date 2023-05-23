import "./commands";

import "../../styles/globals.css";
import { mount } from "cypress/react18";
Cypress.Commands.add("mount", mount);

function passwordValidator() {
  cy.get("[data-cy='item-password-error']").should("not.exist");
  cy.get("[data-cy='input-password']").type("Q");
  cy.get("[data-cy='item-password-error']");
  cy.get("[data-cy='input-password']").type("wert123");
  cy.get("[data-cy='item-password-error']");
  cy.get("[data-cy='input-password']").type("!");
}

function initialFormTests() {
  cy.get("[data-cy='user-auth-page']");
  cy.get("[data-cy='button-user-auth']").should("be.disabled");
  cy.get("[data-cy='input-email']").type("test@mail.com");
  cy.get("[data-cy='button-user-auth']").should("be.disabled");
}

function allStudiesSetup(index) {
  cy.get("[data-cy='item-study-card']");
  cy.get("[data-cy='content-study-card']");
  cy.get("[data-cy='item-study-enlarged']").should("not.exist");
  cy.get("[data-cy='button-open-study']").eq(index).click();
  cy.get("[data-cy='item-study-enlarged']");
}

Cypress.Commands.add("passwordValidator", () => {
  passwordValidator();
});

Cypress.Commands.add("initialFormTests", () => {
  initialFormTests();
});

Cypress.Commands.add("allStudiesSetup", (index) => {
  allStudiesSetup(index);
});
