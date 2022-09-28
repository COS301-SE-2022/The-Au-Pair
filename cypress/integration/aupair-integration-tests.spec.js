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

//Au Pair Calendar testing
it('should show activities for the children that the au pair is employed for', () => {
    cy.get("#cal").click({force:true}).then( () => {
        cy.contains("Mock Activity 1");
        cy.contains("Mock Activity 2");
        cy.contains("Mock Activity 3");
        cy.contains("Mock Activity 4");
        cy.contains("Mock Activity 5");
    });
});

it('should navigate to view activity page', () => {
    cy.get("#cal").click({force:true}).then( () => {
        cy.get(`[ng-reflect-name="eye"]`).eq(0).click({multiple:true, force:true}).then( () => {
            y.url().should('include', '/view-activity')
        }); 
    });
});

it('should open activity feedback modal', () => {
    cy.get("#cal").click({force:true}).then( () => {
        cy.get(`[ng-reflect-name="chatbox-outline"]`).click({multiple:true, force:true}).then( () => {
            cy.contains("Activity Feedback");
        }); 
    });
});

//job summary testing
it('should navigate to job sumary page', () => {
    cy.get("#childDash").click({force:true}).then( () => {
        cy.url().should('include', '/job-summary-au-pair-view')
    }); 
});

it('should show the correct employed au pair when loading au pair cost', () => {
    cy.get("#cash-outline").click({force:true}).then( () => {
        cy.url().should('include', '/au-pair-cost')
        cy.get(".au-pair-name").contains("Parent");
    });
})