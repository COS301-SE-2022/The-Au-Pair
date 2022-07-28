/// <reference types="cypress" />

describe('Admin integration tests', () => {});

beforeEach( () => {
    cy.visit("/login-page")
    cy.get(`[ng-reflect-name="Email"]`).type("irene@hotmail.za"); 
    cy.get(`[ng-reflect-name="Password"]`).type("Ruben@123"); 
    cy.get(".loginUser").click();
});

//Logout testing
it('should allow a Au Pair to logout', () =>
{
    cy.get('.logout-button').click({force:true}).then( () => {
        cy.contains("Login");
    });
});

// Au Pair Profile testing
it('should not allow an admin to modify any details about the profile', () => {
    cy.get("#profile").click({force:true}).then( () => {
        cy.url().should('include', '/admin-console') // => true.
    });
});

it('should show cards of registration requests from the database (if any) upon loading the admin console', () =>{
    cy.get('.auPairCard').should('be.visible');
});

