/// <reference types="cypress" />

describe('Admin integration tests', () => {});

beforeEach( () => {
    cy.visit("/login-page")
    cy.get(`[ng-reflect-name="Email"]`).type("mockadmin@gmail.com"); 
    cy.get(`[ng-reflect-name="Password"]`).type("Admin@123"); 
    cy.get(".loginUser").click();
});

// Logout testing
it('should allow an Admin to logout', () =>
{
    cy.get('.log-in-out-button').click({multiple:true, force:true}).then( () => {
        cy.contains("Login");
    });
});

//Admin permissin testing
it('should not allow an admin to modify any details about the profile', () => {
    cy.get("#profile").click({force:true}).then( () => {
        cy.url().should('include', '/admin-console') // => true.
    });
});

//Au Pair Review testing
it('should show cards of registration requests from the database (if any) upon loading the admin console', () =>{
    cy.get('.auPairCard').should('be.visible');
});

it('should allow and Admin to go to the reports page', () =>{
    cy.get(".reports-button").click().then( () => {
        cy.url().should('include', '/admin-reports') // => true.
    });
});

// Reports review testing
it('should show cards of reports from the database (if any) upon naviagting to the reports page', () =>{
    cy.get(".reports-button").click();
    cy.get(".auPairCard").should('be.visible');
});

//Admin review actions testing
it('should allow admins to ban, warn or dismiss reports on the repots page', () =>{
    cy.get(".reports-button").click();
    cy.get(".ban");
    cy.get(".warn");
    cy.get(".dismiss");
});
