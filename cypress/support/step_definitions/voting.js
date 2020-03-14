import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const wrapKeys = {
  products: "products",
  selectedProduct: "selectedProduct"
};

Given("I am on the {string} page at URL {string}", (pageName, url) => {
  cy.visit(url);
  cy.server();
  cy.route({ method: "GET", url: "/api/v1/products" }).as("allProducts");
});

Given("all products have loaded", () => {
  cy.wait("@allProducts");

  // This reads the data from the response and wraps it for use later
  cy.get("@allProducts").then(({ response }) => {
    const { body } = response;
    cy.wrap(body.products).as(wrapKeys.products);
  });
});

When("I vote for an individual product", () => {
  cy.get(`@${wrapKeys.products}`).then(products => {
    const [product] = products;
    const { id } = product;
    cy.wrap(product).as(wrapKeys.selectedProduct);

    cy.route({ method: "PUT", url: `/api/v1/products/${id}/vote` }).as("vote");

    // Chose to use testid over data-cy to save using lots of duplicated attrs
    cy.get(`[data-testid=product-li-button-${id}]`).click();
  });
});

When("the product has updated", () => {
  cy.wait("@vote");
});

Then("the vote count increases by one", () => {
  cy.get(`@${wrapKeys.selectedProduct}`).then(({ id, votes }) => {
    cy.get(`[data-testid=product-li-votes-${id}]`).should("contain", votes + 1);
  });
});
