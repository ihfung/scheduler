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

//npm run cypress

//contain is used to check if the element contains the text like <button name="save">Save</button> so we can use cy.contains("Save") to check if the button contains the text "Save"

//get is used to get the element by its attribute like <button name="save">Save</button> so we can use cy.get("[name=save]") to get the button element or <input value="hello"> so we can use cy.get("input") to get the input element

//should is used to check if the element has the property like <button name="save">Save</button> so we can use cy.get("[name=save]").should("exist") to check if the button element exists

//click is used to click the element like <button name="save">Save</button> so we can use cy.get("[name=save]").click() to click the button element

//first is getting the first element of the array of elements like <button name="save">Save</button> <button name="save">Save</button> so we can use cy.get("[name=save]").first() to get the first button element

//clear is used to clear the input field like <input value="hello"> so we can use cy.get("input").clear() to clear the input field
 
//type is used to type the text in the input field like <input value="hello"> so we can use cy.get("input").type("world") to type the text "world" in the input field

//request is used to make the network request like GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD, CONNECT, TRACE so request("GET", "/api/debug/reset") is used to make the GET request to the "/api/debug/reset" endpoint

//visit is used to visit the URL like visit("/") is used to visit the root URL kinda the main page of the application


/*
Summary
Running these tests before we commit our code is easy. It is much easier and more consistent than doing the same tests manually. These tests take longer to run because they have to load a browser. It is worth it test the integration of the client and the server.

If we wanted to test only the client, then we would use the powerful server mocking tools provided by Cypress. The documentation for Network Requests describes two test strategies.

Don't Stub Responses 
Stub Responses
We chose the first strategy, which means that we do not stub responses. Our goal is to test the integration of the client and the server using Cypress. We would not be able to meet that requirement if we stub responses.
*/