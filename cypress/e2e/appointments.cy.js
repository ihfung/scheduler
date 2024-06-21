describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
  
    
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show","Sylvia Palmer");


  });

  
  it("should edit an interview", () => {
  
    cy.get("[alt=Edit]").first().click({force: true});
    cy.get("[data-testid=student-name-input").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show","Tori Malcolm");

  });


   
  it("should cancel an interview", () => {
  
    cy.get("[alt=Delete]").first().click({force: true});
   
    cy.contains("Confirm").click();
    
    cy.contains("Deleting").should("exist");

    cy.contains("Deleting").should("not.exist");
    
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");

  });

});

/*
Summary
Running these tests before we commit our code is easy. It is much easier and more consistent than doing the same tests manually. These tests take longer to run because they have to load a browser. It is worth it test the integration of the client and the server.

If we wanted to test only the client, then we would use the powerful server mocking tools provided by Cypress. The documentation for Network Requests describes two test strategies.

Don't Stub Responses 
Stub Responses
We chose the first strategy, which means that we do not stub responses. Our goal is to test the integration of the client and the server using Cypress. We would not be able to meet that requirement if we stub responses.
*/