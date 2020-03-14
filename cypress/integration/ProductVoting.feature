Feature: Users can vote for products

  Each product has a vote count.  The user should be able to change that count
  by interacting with the product.

  Background:
    Given I am on the "products" page at URL "/"
    And all products have loaded

  Scenario: I can increase the votes for a product
    When I vote for an individual product
    And the product has updated
    Then the vote count increases by one
