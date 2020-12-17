describe("Selecting", () => {
  //describe() and context() are the same
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

const testEmail = "robin.Paul@aol.com";
const testPassword = "house";
const testName = "Robin Paul";

describe("Testing user input", () => {
  it("typing it allllll out", () => {
    cy.get(".name").click().type(testName).should("have.value", testName);
    cy.get("button").should("be.disabled");
    cy.get(".email").click().type(testEmail).should("have.value", testEmail);
    cy.get("button").should("be.disabled");
    cy.get(".password")
      .click()
      .type("fakePassword!")
      .should("have.value", "fakePassword!")
      .clear();
    cy.get("button").should("be.disabled");
    cy.get(":checkbox").click().should("be.checked");
    cy.get(".password")
      .click()
      .type(testPassword)
      .should("have.value", testPassword);
    cy.get("button").click();
  });
  it("did the user populate the display div?", () => {
    cy.get(".display")
      .contains(testPassword)
      .contains(testEmail)
      .contains(testName);
  });
});
