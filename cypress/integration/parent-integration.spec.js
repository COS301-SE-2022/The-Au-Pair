/// <reference types="cypress" />

describe('Parent integration tests', () => {});

beforeEach( () => {
    cy.visit("/login-page")
    cy.get(`[ng-reflect-name="Email"]`).type("bob@gmail.com"); 
    cy.get(`[ng-reflect-name="Password"]`).type("Bob@1234"); 
    cy.get(".loginUser").click();
});

//Activity Tests
it('should not add an activity with a location not returned by the API', () => {
    cy.get("#addAct").click({force:true}).then( () => {
        cy.get('[ng-reflect-name="activityName"]').type("Test Activity");
        cy.get('[ng-reflect-name="description"]').type("Test description");
        cy.get('[ng-reflect-name="location"]').type("invalid location");
        cy.get('[ng-reflect-name="dayOfWeek"]').select("Monday");
        cy.get('[ng-reflect-name="timeSlot"]').select("05:00-06:00");
        cy.get('[ng-reflect-name="budget"]').type("0");
        cy.get('[ng-reflect-name="childId"]').select("Peter");
        cy.get('.addActivity').click({force:true}).then( () => {
            cy.contains('Please select a valid location from the suggested below.');
        });
    });
});

//Location tracking tests
it('should load a map when attempting to track your au pairs live location', () =>
{
    cy.get("#trackAuPair").click({force:true}).then( () => {
        cy.get(".leaflet-tile").should('be.visible');
    });
});

//Parent dashboard testing 
it('should populate the parent dashboard with your registered children from the database', () => {
    cy.contains("Peter");
    cy.contains("Wally");
    cy.contains("Sally");
})

it('should allow a parent to logout', () =>
{
    cy.get('.logout-button').click({force:true}).then( () => {
        cy.contains("Login");
    });
});

// Parent Profile testing
it('should show the logged in users name on the parent profile page', () => {
    cy.get("#profile").click({force:true}).then( () => {
        cy.get('.profile-name').contains("Bob Stone");
    });
});

//FIX THIS TEST AFTER KYLES PR

// it('should not update the parent profile with a location not returned by the API', () => {
//     cy.get("#profile").click({force:true}).then( () => {
//         cy.get('#change').click({force:true}).then( () => {
//             cy.get('[ng-reflect-name="address"]').focus().clear().then( ()=> {
//                 cy.get('[ng-reflect-name="address"]').type("invalid address");
//                 cy.get(`[value="Update Details]`).click({force: true})
//             });
//         })
//     });
// });

// Schedule testing
it('should populate the schedule with activities from the database', async () => {
    await cy.get("#schedule").click({force:true}).then( () => {
        cy.get('.card').contains("AI Lesson");
    });
});

// Children Testing 
it('should populate the Children dashboard page with your registered children from the database', () => {
    cy.get("#childDash").click({force:true}).then( () => {
        cy.contains("Peter Griffin");
        cy.contains("Wally West");
        cy.contains("Sally Siver");
    });
})

it('should allow a parent to route to "add a child" page', () => {
    cy.get("#childDash").click({force:true}).then( () => {
        cy.get('#addChild').click({force: true}).then( () => {
            cy.contains("Add A Child");
        })
    });
})

// Au Pair Cost Testing 
it('should show the correct employed au pair when loading au pair cost', () => {
    cy.get("#auPairCost").click({force:true}).then( () => {
        cy.get(".au-pair-name").contains("Denny");
    });
})
