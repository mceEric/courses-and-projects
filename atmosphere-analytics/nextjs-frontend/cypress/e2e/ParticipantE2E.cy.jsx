describe("Participant E2E test", function () {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
  });

  it("Participant Login", () => {
    cy.userLogin(true);
    cy.saveLocalStorage();
  });

  it("Participant can experience dashboard with no problem", () => {
    cy.get(`[data-cy='button-visit-participant-login']`).click();
    cy.get("[data-cy='main-component']");
    cy.get("[data-cy='toggle-change-color-scheme']").click();
    cy.get("[data-cy='toggle-change-color-scheme']").click();
  });

  it("A participant can enroll in a study in AllStudiesPage", () => {
    cy.get(`[data-cy='button-visit-participant-login']`).click();
    cy.get("[data-cy='main-component']");
    cy.get("[data-cy='navigation-all-studies']").click();
    cy.get("[data-cy='toggle-change-color-scheme']").click();
    cy.get(`[data-cy='item-study-card']`);
    cy.get("[data-cy='button-open-study']").eq(1).click();
    cy.get("[data-cy='item-study-enlarged']");
    cy.get("[data-cy='button-display-enrollment']").click({ force: true });
    cy.get("[data-cy='overlay-study-enrollment']");
    cy.get("[data-cy='button-cancel-enrollment']").click();
    cy.get("[data-cy='overlay-study-enrollment']").should("not.exist");
    cy.get("[data-cy='button-display-enrollment']").click({ force: true });
    cy.get("[data-cy='button-study-enrollment']").click();
    cy.get("[data-cy='button-cancel-enrollment']").click();

    cy.get("[data-cy='button-close-study']").click();
    cy.get("[data-cy='item-study-enlarged']").should("not.exist");
  });

  it("Participant can perform all actions within EnrolledStudiesPage", () => {
    cy.get(`[data-cy='button-visit-participant-login']`).click();
    cy.get("[data-cy='main-component']");
    cy.get("[data-cy='navigation-enrolled-studies']").click();
    cy.get("[data-cy='toggle-change-color-scheme']").click();
    cy.get(`[data-cy='item-study-card']`);
    cy.get("[data-cy='button-open-study']").eq(1).click();
    cy.get("[data-cy='item-study-enlarged']");
    cy.get("[data-cy='button-show-less']").click();
    cy.get("[data-cy='item-study-enlarged']").should("not.exist");
    cy.get("[data-cy='button-open-study']").eq(1).click();

    cy.wait(2000);
    cy.get("[data-cy='button-graph-settings']").click();
    cy.get("[data-cy='dropdown-window-period']").click();
    cy.get("[data-cy='dropdown-window-period-item']").eq(4).click();
    cy.get("[data-cy='dropdown-time-range']").click({ force: true });
    cy.get("[data-cy='dropdown-time-range-item']").eq(3).click();
    cy.get("[data-cy='button-close-graph-settings']").click();

    cy.wait(2000);
    cy.get("[data-cy='button-graph-settings']").click();
    cy.get("[data-cy='dropdown-window-period']").click();
    cy.get("[data-cy='dropdown-window-period-item']").eq(2).click();
    cy.get("[data-cy='dropdown-time-range']").click({ force: true });
    cy.get("[data-cy='dropdown-time-range-item']").eq(2).click();
    cy.get("[data-cy='button-close-graph-settings']").click();

    cy.get("[data-cy='button-answer-questionnaire']").click();
    cy.get("[data-cy='button-close-questionnaire']").click();
    cy.get("[data-cy='button-answer-questionnaire']").click();
    cy.get("[data-cy='overlay-questionnaire-slides']");
    cy.get("[data-cy='button-previous-slide']").eq(0).click({ force: true });
    cy.get("[data-cy='button-next-slide']").eq(6).click({ force: true });
    cy.get("[data-cy='button-next-slide']").eq(0).click({ force: true });
    cy.get("[data-cy='button-questions-0']").eq(0).click({ force: true });
    cy.get("[data-cy='button-next-slide']").eq(1).click({ force: true });
    cy.get("[data-cy='button-questions-1']").eq(1).click({ force: true });
    cy.get("[data-cy='button-next-slide']").eq(2).click({ force: true });
    cy.get("[data-cy='button-questions-2']").eq(2).click({ force: true });
    cy.get("[data-cy='button-next-slide']").eq(3).click({ force: true });
    cy.get("[data-cy='button-questions-3']").eq(3).click({ force: true });
    cy.get("[data-cy='button-next-slide']").eq(4).click({ force: true });
    cy.get("[data-cy='button-questions-4']").eq(4).click({ force: true });
    cy.get("[data-cy='button-next-slide']").eq(5).click({ force: true });

    cy.get("[data-cy='button-submit-answers']").click();
    cy.get("[data-cy='button-study-enrollment']").click();

    cy.get("[data-cy='button-display-unenrollment']").click();
    cy.get("[data-cy='overlay-study-enrollment']");
    cy.get("[data-cy='button-cancel-enrollment']").click();
    cy.get("[data-cy='overlay-study-enrollment']").should("not.exist");
    cy.get("[data-cy='button-display-unenrollment']").click();
    cy.get("[data-cy='button-study-enrollment']").click();
    cy.get("[data-cy='button-cancel-enrollment']").click();

    cy.get("[data-cy='item-study-enlarged']").should("not.exist");
  });

  it("Participant can perform all actions within Settings", () => {
    cy.get(`[data-cy='button-visit-participant-login']`).click();
    cy.get("[data-cy='main-component']");
    cy.get("[data-cy='navigation-settings']").click();
    cy.get("[data-cy='toggle-change-color-scheme']").click();
    cy.get("[data-cy='message-overlay-permission']").should("not.exist");
    cy.get("[data-cy='button-enable-push-notifications']").click();
    cy.get("[data-cy='message-overlay-permission']");

    cy.get("[data-cy='button-overlay-prompt']").click();
    cy.get("[data-cy='overlay-help-steps']").click();
    cy.get("[data-cy='button-next-slide']").eq(1).click({ force: true });
    cy.get("[data-cy='button-next-slide']").eq(2).click({ force: true });
    cy.get("[data-cy='button-previous-slide']").eq(3).click({ force: true });
    cy.get("[data-cy='button-previous-slide']").eq(2).click({ force: true });
    cy.get("[data-cy='button-previous-slide']").eq(1).click({ force: true });

    cy.get("[data-cy='button-close-help-steps']").eq(1).click({ force: true });
    cy.get("[data-cy='button-close-permission-overlay']").click();
    cy.get("[data-cy='message-overlay-permission']").should("not.exist");
  });

  it("Correct auth redirection and Participant Logout", () => {
    cy.authRedirectionAndLogout(true);
    cy.clearLocalStorageSnapshot();
  });
});
