/// <reference types="cypress" />

describe('Au Pair integration tests', () => {});

beforeEach( () => {
    cy.visit("/login-page")
    cy.get(`[ng-reflect-name="Email"]`).type("deni@gmail.com"); 
    cy.get(`[ng-reflect-name="Password"]`).type("Deni@123"); 
    cy.get(".loginUser").click();
});

// Au Pair Profile testing
it('should show the logged in users name on the au pair profile page', () => {
    cy.get("#profile").click({force:true}).then( () => {
        cy.get('.profile-name').contains("Denny Ezmanov");
        cy.contains("0110135054098");
    });
});

it('should show the logged in users email available to edit', () => {
    cy.get("#profile").click({force:true}).then( () => {
        cy.get("#change").click({force:true}).then( () => {
            cy.contains('deni@gmail.com');
        })
    });
});

//Logout testing
it('should allow a Au Pair to logout', () =>
{
    cy.get('.logout-button').click({force:true}).then( () => {
        cy.contains("Login");
    });
});

//Au Pair home page tesing
it('should display the logged in users name when loading the home page', () =>{
    cy.get(".welcome-heading").contains("Denny");
})

it('should show the children you are an au pair for when loading the home page', () => {
    cy.get('.child-status').contains("Peter, Wally, Sally");
})

it('should show the employer you are an au pair for when loading the home page', () => {
    cy.get('.employer-name').contains("Bob Stone");
})

// //Au Pair Calendar testing
// it('should show activities for the children that the au pair is employed for', {defaultCommandTimeout: 10000} , () => {
//     cy.visit("/login-page")
//     cy.get(`[ng-reflect-name="Email"]`).type("deni@gmail.com"); 
//     cy.get(`[ng-reflect-name="Password"]`).type("Deni@123"); 
//     cy.get(".loginUser").click().then( () => {
//     cy.get('#cal').click({force:true}).then( () => {
//         cy.get(".card").contains("Peter");
//         cy.get(".card").contains("Wally");
//         cy.get(".card").contains("Sally");
//     });
//     });
// });
