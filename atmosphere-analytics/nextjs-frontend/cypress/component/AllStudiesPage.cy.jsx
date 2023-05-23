import AllStudiesPage from "../../components/pages/participant-page/studies/all-studies-page/AllStudiesPage";

context("<AllStudiesPage />", function () {
  const darkMode = false;
  beforeEach(() => {
    cy.mount(
      <AllStudiesPage
        user={{
          enrolledStudies: [
            {
              description: "Developed in 2004.",
              name: "Asthma Control Test™ (ACT™)",
              objective: "To assess asthma control",
              shortName: "ACT",
              __v: 0,
              _id: "63d546710e4cb6f9f04bcf5e",
            },
          ],
          firstName: "Eric",
          isAdmin: false,
          lastName: "McEvoy",
          notificationToken: "8e952dde-e2b6-4352-9e22-5bf39853e40f",
          username: "eric@mail.com",
          __v: 45,
          _id: "63b9af30a9921ebd9de096bf",
        }}
        setUser={() => null}
        colors={{
          primary: {
            bg: darkMode ? "bg-[#212121]" : "bg-white",
            text: darkMode ? "text-[#212121]" : "text-white",
            hover: darkMode ? "hover:text-white" : "hover:text-[#212121]",
            violetBg: darkMode ? "bg-violet-300" : "bg-violet-700",
            violetText: darkMode ? "text-violet-700" : "text-violet-300",
            violetHover: darkMode
              ? "group-hover:text-violet-300"
              : "group-hover:text-violet-700",
          },

          primaryRev: {
            bg: !darkMode ? "bg-[#212121]" : "bg-white",
            text: !darkMode ? "text-[#212121]" : "text-white",
            hover: !darkMode ? "hover:text-white" : "hover:text-[#212121]",
            violetBg: !darkMode ? "bg-violet-300" : "bg-violet-700",
            violetText: !darkMode ? "text-violet-700" : "text-violet-300",
            violetHover: !darkMode
              ? "group-hover:text-violet-300"
              : "group-hover:text-violet-700",
          },

          secondary: {
            bg: darkMode ? "bg-[#2f2b30]" : "bg-violet-50",
            text: darkMode ? "text-[#2f2b30]" : "text-violet-50",
            violetBg: darkMode ? "bg-violet-200" : "bg-violet-500",
            violetText: darkMode ? "text-violet-500" : "text-violet-200",
            violetHover: darkMode
              ? "group-hover:text-violet-200"
              : "group-hover:text-violet-500",
          },

          gray: {
            bg: darkMode ? "bg-gray-400" : "bg-gray-500",
            text: darkMode ? "text-gray-400" : "text-gray-500",
          },

          masked: {
            bg: !darkMode ? "bg-gray-100" : "bg-[#272429]",
            text: !darkMode ? "text-gray-100" : "text-gray-600",
          },
        }}
        isComponentTest={true}
      />
    );
  });

  it("Enlarging non-enrolled study", () => {
    cy.allStudiesSetup(1);
    cy.get("[data-cy='item-enrollment-display']").should("not.exist");
    cy.get("[data-cy='button-display-enrollment']").should("be.disabled");
    cy.get("[data-cy='button-cancel-enrollment']").should("not.exist");
    cy.get("[data-cy='item-enrollment-display']").should("not.exist");
    cy.get("[data-cy='button-close-study']").click({ force: true });
    cy.get("[data-cy='item-study-enlarged']").should("not.exist");
  });

  it("Enlarging already enrolled study", () => {
    cy.allStudiesSetup(0);
    cy.get("[data-cy='report-study-enrollment']");
    cy.get("[data-cy='button-display-enrollment']").should("be.disabled");
  });
});
