/// <reference types="cypress" />

describe('General User Tests', () => {});

//Landing page tests
it('should show the about page of the app and allow naviagtion to register, login and has a button to our Git repo', () =>
{
    cy.visit("/landing-page")
    cy.contains('Need an Au Pair?');
    cy.get(".signUp").click({multiple:true, force:true}).then( () => {
        cy.url().should('include', '/register-page')
        cy.visit("/landing-page")
    });
    cy.get('.log-in-out-button').click({multiple:true, force:true}).then( () => {
        cy.url().should('include', '/login-page')
        cy.visit("/landing-page")
    });
    cy.get('.git-button');
});

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