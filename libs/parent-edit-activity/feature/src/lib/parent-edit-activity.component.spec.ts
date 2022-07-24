import { ComponentFixture, TestBed} from '@angular/core/testing';
import { ParentEditActivityComponent } from './parent-edit-activity.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { Activity } from '../../../../shared/interfaces/interfaces';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import {RouterTestingModule} from "@angular/router/testing";

describe('ParentEditActivityComponent', () => {
  let component: ParentEditActivityComponent;
  let fixture: ComponentFixture<ParentEditActivityComponent>;

  //Valid form
  const populatedForm = {activityName: "AI", description: "AI Lesson", location: "UP", dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "0", childId:"8675945310542"};

  //Inavlid forms
  const emptyActName = {activityName: "", description: "AI Lesson", location: "UP", dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "0", childId:"8675945310542"};
  const emptyDescription = {activityName: "AI", description: "", location: "UP", dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "0", childId:"8675945310542"};
  const emptyLocation = {activityName: "AI", description: "AI Lesson", location: "", dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "0", childId:"8675945310542"};
  const emptyDay = {activityName: "AI", description: "AI Lesson", location: "UP", dayOfWeek: "", timeSlot: "13:00-14:00", budget: "0", childId:"8675945310542"};
  const emptyTime = {activityName: "AI", description: "AI Lesson", location: "UP", dayOfWeek: "Wednesday", timeSlot: "", budget: "0", childId:"8675945310542"};
  const emptyBudget = {activityName: "AI", description: "AI Lesson", location: "UP", dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "", childId:"8675945310542"};
  const emptyChild = {activityName: "AI", description: "AI Lesson", location: "UP", dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "0", childId:""};

  //Invalid activity to be updated
  const invalidActivity = {id: "invalidId", name: "AI", description: "AI Lesson", location: "UP", timeStart:"13:00", timeEnd: "14:00",  budget: 0.0 ,comment: "", behavior: 0, day: "Wednesday", child:"8675945310542"};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentEditActivityComponent],
      imports: [FormsModule,
        IonicModule,
        HttpClientTestingModule,
        NavbarModule,
        RouterTestingModule,
    ],
    providers: [API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentEditActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Testing the services**/
  it('should, when editActivity() is called with an invalid activity ID, return an error from the API', async ()=>{
    const expectedValue = undefined;
    jest.spyOn(component,"editActivity");
    expect(await component.editActivity(invalidActivity)).toEqual(expectedValue);
  })

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Empty fields form testing**/
  it('should, given a form with no activity name, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "",
      description: "",
      location:"",
      timeStart: "",
      timeEnd: "",
      budget: 0.0,
      comment: "",
      behavior: 0,
      day: "",
      child: "",
    };

    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(emptyActName);

    expect(component.activityDetails).toEqual(expectedValue);
  })

  it('should, given a form with no description, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "",
      description: "",
      location:"",
      timeStart: "",
      timeEnd: "",
      budget: 0.0,
      comment: "",
      behavior: 0,
      day: "",
      child: "",
    };

    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(emptyDescription);

    expect(component.activityDetails).toEqual(expectedValue);
  })

  it('should, given a form with no location, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "",
      description: "",
      location:"",
      timeStart: "",
      timeEnd: "",
      budget: 0.0,
      comment: "",
      behavior: 0,
      day: "",
      child: "",
    };

    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(emptyLocation);

    expect(component.activityDetails).toEqual(expectedValue);
  })

  it('should, given a form with no day of the week selected, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "",
      description: "",
      location:"",
      timeStart: "",
      timeEnd: "",
      budget: 0.0,
      comment: "",
      behavior: 0,
      day: "",
      child: "",
    };

    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(emptyDay);

    expect(component.activityDetails).toEqual(expectedValue);
  })

  it('should, given a form with no time slot selected, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "",
      description: "",
      location:"",
      timeStart: "",
      timeEnd: "",
      budget: 0.0,
      comment: "",
      behavior: 0,
      day: "",
      child: "",
    };

    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(emptyTime);

    expect(component.activityDetails).toEqual(expectedValue);
  })

  it('should, given a form with no budget, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "",
      description: "",
      location:"",
      timeStart: "",
      timeEnd: "",
      budget: 0.0,
      comment: "",
      behavior: 0,
      day: "",
      child: "",
    };

    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(emptyBudget);

    expect(component.activityDetails).toEqual(expectedValue);
  })

  it('should, given a form with no ChildID selected, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "",
      description: "",
      location:"",
      timeStart: "",
      timeEnd: "",
      budget: 0.0,
      comment: "",
      behavior: 0,
      day: "",
      child: "",
    };

    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(emptyChild);

    expect(component.activityDetails).toEqual(expectedValue);
  })

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
});
