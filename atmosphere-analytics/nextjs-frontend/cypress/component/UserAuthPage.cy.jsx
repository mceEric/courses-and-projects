import UserAuthPage from "../../components/pages/user-auth-page/UserAuthPage";

context("<QuestionnaireItem />", function () {
  beforeEach(() => {
    cy.mount(<UserAuthPage isParticipant={true} />);
  });

  it("Signup Form", () => {
    cy.initialFormTests();
    cy.get("[data-cy='input-first-name']").type("Test");
    cy.get("[data-cy='button-user-auth']").should("be.disabled");
    cy.get("[data-cy='input-last-name']").type("Test");
    cy.get("[data-cy='button-user-auth']").should("be.disabled");
    cy.passwordValidator();
    cy.get("[data-cy='button-user-auth']").should("be.disabled");
  });

  it("Login Form", () => {
    cy.get("[data-cy='button-switch-prompts']").click({ force: true });
    cy.initialFormTests();
    cy.passwordValidator();
    cy.get("[data-cy='button-user-auth']").should("not.be.disabled");
  });
});
