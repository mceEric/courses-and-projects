describe("Researcher E2E test", function () {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
  });

  it("Initial Researcher Login", () => {
    cy.userLogin(false);
    cy.saveLocalStorage();
  });

  it("Initial Study Dashboard Page works as expected", () => {
    cy.get(`[data-cy='button-visit-researcher-login']`).click();
    cy.get(`[data-cy='study-dashboard']`);
    cy.get("[data-cy='toggle-change-color-scheme']").click();
    cy.get("[data-cy='toggle-change-color-scheme']").click();
  });

  it("Initial Study Participants works as expected", () => {
    cy.get(`[data-cy='button-visit-researcher-login']`).click();
    cy.get(`[data-cy='study-dashboard']`);
    cy.get("[data-cy='navigation-study-participants']").click();
    cy.get("[data-cy='toggle-change-color-scheme']").click();
  });

  it("Initial Study Creation works as expected", () => {
    cy.get(`[data-cy='button-visit-researcher-login']`).click();
    cy.get(`[data-cy='study-dashboard']`);
    cy.get("[data-cy='navigation-study-creation']").click();
    cy.get("[data-cy='toggle-change-color-scheme']").click();
    cy.get("[data-cy='toggle-change-color-scheme']").click();
    cy.get("[data-cy='input-name']").type("Test Study");
    cy.get("[data-cy='input-short-name']").type("Test Study");
    cy.get("[data-cy='input-description']").type("Test Study");
    cy.get("[data-cy='input-objective']").type("Test Study");

    cy.get("[data-cy='dropdown-window-period']").click();
    cy.get("[data-cy='dropdown-window-period-item']").eq(1).click();
    cy.get("[data-cy='dropdown-time-range']").click({ force: true });
    cy.get("[data-cy='dropdown-time-range-item']").eq(1).click();
    cy.get("[data-cy='toggle-change-color-scheme']").click();
  });

  it("Correct auth redirection and Researcher Logout", () => {
    cy.authRedirectionAndLogout(false);
    cy.clearLocalStorageSnapshot();
  });

  it("Final Researcher Login", () => {
    cy.userLogin(false, true);
    cy.saveLocalStorage();
  });

  it("Final Study Dashboard Page works as expected", () => {
    cy.get(`[data-cy='button-visit-researcher-login']`).click();
    cy.get(`[data-cy='study-dashboard']`);
    cy.get("[data-cy='toggle-change-color-scheme']").click();
    cy.get("[data-cy='toggle-change-color-scheme']").click();
  });

  it("Final Study Participants works as expected", () => {
    cy.get(`[data-cy='button-visit-researcher-login']`).click();
    cy.get(`[data-cy='study-dashboard']`);
    cy.get("[data-cy='navigation-study-participants']").click();
    cy.get("[data-cy='toggle-change-color-scheme']").click();
  });

  it("Final Study Creation works as expected", () => {
    cy.get(`[data-cy='button-visit-researcher-login']`).click();
    cy.get(`[data-cy='study-dashboard']`);
    cy.get("[data-cy='toggle-change-color-scheme']").click();
  });

  it("Correct auth redirection and Researcher Logout", () => {
    cy.authRedirectionAndLogout(false);
    cy.clearLocalStorageSnapshot();
  });
});
