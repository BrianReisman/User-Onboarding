describe("Selecting", () => {//describe() and context() are the same
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Types of cy.get() selectors", () => {
    //!Note: all arguments passed to the get() method on the cy object need to be passed in as strings.
    //!Note: cy will throw a linting error/warning but works perfectly fine so long as your tests run.
    cy.get("h2"); //select an element by its HTML tag
    cy.get(".name"); //select an element by its className
    cy.get(":checkbox"); //selelct by type (). Only works if there is one of this type if not, see next example.
    cy.get("form input:last"); //select and element by itentifying its parent (form) and then using a child HTML element w/pseudo selector
    cy.get(":text:first"); //type and pseudo selector in one
    cy.get("#email"); //select an element by its ID

    //Traversing after you get .next() and .prev() can be used with any combo of selector types like above
    // cy.get('.name')
    // cy.get().prev()
  });
});

describe("Testing user input", () => {
  it("typing it allllll out", () => {
    cy.get(".name").click().type("test name").should("have.value", "test name");
    cy.get(".email")
      .click()
      .type("test@aol.com")
      .should("have.value", "test@aol.com");
    cy.get(".password")
      .click()
      .type("testpassword!")
      .should("have.value", "testpassword!");
    cy.get("button").should("be.disabled");
    cy.get(":checkbox").click().should("be.checked");
    cy.get("button").click();
  });
});
