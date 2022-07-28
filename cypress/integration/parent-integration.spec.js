/// <reference types="cypress" />

describe('User login and registration tests', () => {});

beforeEach( () => {
    cy.visit("/login-page")
    cy.get(`[ng-reflect-name="Email"]`).type("bob@gmail.com"); 
    cy.get(`[ng-reflect-name="Password"]`).type("Bob@1234"); 
    cy.get(".loginUser").click();
})

it('should allow a Au Pair to logout', () =>
{
    cy.get('.logout-button');
});