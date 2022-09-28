/// <reference types="cypress" />

describe('Au Pair integration tests', () => {});

beforeEach( () => {
    cy.visit("/login-page")
    cy.get(`[ng-reflect-name="Email"]`).type("mockaupair@gmail.com"); 
    cy.get(`[ng-reflect-name="Password"]`).type("Aupair@123"); 
    cy.get(".loginUser").click();
});

// Au Pair Profile testing
it('should show the logged in users name on the au pair profile page', () => {
    cy.get("#profile").click({force:true}).then( () => {
        cy.get('.profile-name').contains("Aupair Mock");
        cy.contains("0206055215094");
    });
});

it('should show the logged in users email available to edit', () => {
    cy.get("#profile").click({force:true}).then( () => {
        cy.get("#change").click({force:true}).then( () => {
            cy.contains('mockaupair@gmail.com');
        })
    });
});

//Logout testing
it('should allow a aupair to logout', () =>
{
    cy.get('.log-in-out-button').click({multiple:true, force:true}).then( () => {
        cy.contains("Login");
    });
});

//Au Pair home page tesing
it('should display the logged in users name when loading the home page', () =>{
    cy.get(".welcome-heading").contains("Aupair");
})

it('should show the children you are an au pair for when loading the home page', () => {
    cy.get('.child-status').contains("Child 1, Child 2");
})

it('should show the employer you are an au pair for when loading the home page', () => {
    cy.get('.employer-name').contains("Parent Mock");
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
