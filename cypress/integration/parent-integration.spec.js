/// <reference types="cypress" />

describe('Parent integration tests', () => {});

beforeEach( () => {
    cy.visit("/login-page")
    cy.get(`[ng-reflect-name="Email"]`).type("mockparent@gmail.com"); 
    cy.get(`[ng-reflect-name="Password"]`).type("Parent@123"); 
    cy.get(".loginUser").click();
});

// Activity Tests
it('should not add an activity with a location not returned by the API', () => {
    cy.get("#addAct").click({force:true}).then( () => {
        cy.get('[ng-reflect-name="activityName"]').type("Test Activity");
        cy.get('[ng-reflect-name="description"]').type("Test description");
        cy.get('[ng-reflect-name="location"]').type("invalid location");
        cy.get('[ng-reflect-name="dayOfWeek"]').select("Monday");
        cy.get('[ng-reflect-name="timeSlot"]').select("05:00-06:00");
        cy.get('[ng-reflect-name="budget"]').type("0");
        cy.get('[ng-reflect-name="childId"]').select("Child 1");
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
    cy.contains("Child 1");
    cy.contains("Child 2");
})

it('should allow a parent to logout', () =>
{
    cy.get('.log-in-out-button').click({multiple:true, force:true}).then( () => {
        cy.contains("Login");
    });
});

// Parent Profile testing
it('should show the logged in users name on the parent profile page', () => {
    cy.get("#profile").click({force:true}).then( () => {
        cy.get('.profile-name').contains("Parent");
    });
});

it('should not update the parent profile with a location not returned by the API', () => {
    cy.get("#profile").click({force:true}).then( () => {
        cy.get('#change').click({force:true}).then( () => {
            cy.get('[ng-reflect-name="address"]').focus().clear().then( ()=> {
                cy.get('[ng-reflect-name="address"]').type("invalid address");
                cy.get(".submit-button").click({force: true}).then( () => {
                    cy.contains('Please select a valid location from the suggested below');
                });
            });
        })
    });
});

// Schedule testing
it('should populate the schedule with activities from the database', async () => {
    await cy.get("#schedule").click({force:true}).then( () => {
        cy.get('.card').contains("Mock Activity 3");
    });
});

// Children Testing 
it('should populate the Children dashboard page with your registered children from the database', () => {
    cy.get("#childDash").click({force:true}).then( () => {
        cy.contains("Child 1 Mock");
        cy.contains("Child 2 Mock");
    });
})

it('should allow a parent to route to "add a child" page', () => {
    cy.get("#childDash").click({force:true}).then( () => {
        cy.get('#addChild').click({force: true}).then( () => {
            cy.url().should('include', '/add-child') // => t
        })
    });
})

// Au Pair Cost Testing 
it('should show the correct employed au pair when loading au pair cost', () => {
    cy.get("#auPairCost").click({force:true}).then( () => {
        cy.get(".au-pair-name").contains("Aupair");
    });
})

// Explore testing
it('should allow a parent who hasnt employed an au pair yet, to view/explore au pairs to potentially hire', () => {
    cy.get('.log-in-out-button').click({multiple:true, force:true});
    cy.get(`[ng-reflect-name="Email"]`).type("mockhire@gmail.com"); 
    cy.get(`[ng-reflect-name="Password"]`).type("Hire@123"); 
    cy.get(".loginUser").click();
    cy.wait(2000);
    cy.get("#exploreAuPairs").click({force:true}).then( () => {
        cy.get(".au-pair-card-div-wrapper").contains("Ruben Brits");
    });
});
