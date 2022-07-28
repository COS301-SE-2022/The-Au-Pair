/// <reference types="cypress" />

describe('User login and registration tests', () => {});

// Login tests
it('should allow a Au Pair to login', () =>
{
    cy.visit("/login-page")
    cy.get(`[ng-reflect-name="Email"]`).type("deni@gmail.com"); 
    cy.get(`[ng-reflect-name="Password"]`).type("Deni@123"); 
    cy.get(".loginUser").click().then( () => {
        cy.contains("Welcome");
    });
});

it('should allow a parent to login', () =>
{
    cy.visit("/login-page")
    cy.get(`[ng-reflect-name="Email"]`).type("bob@gmail.com"); 
    cy.get(`[ng-reflect-name="Password"]`).type("Bob@1234"); 
    cy.get(".loginUser").click().then( () => {
        cy.contains("Welcome");
    });
});