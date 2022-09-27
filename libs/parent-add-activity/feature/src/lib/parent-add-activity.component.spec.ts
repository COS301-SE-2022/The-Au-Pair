import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ParentAddActivityComponent } from './parent-add-activity.component';
import { Activity } from '../../../../shared/interfaces/interfaces';
import { API } from '../../../../shared/api/api.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';


describe('ParentAddActivityComponent', () => {
  let component: ParentAddActivityComponent;
  let fixture: ComponentFixture<ParentAddActivityComponent>;

  //Valid form
  // const populatedForm = {activityName: "AI", description: "AI Lesson", location: "UP", dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "0", childId:"8675945310542"};

  //Inavlid forms
  const emptyActName = {activityName: "", description: "AI Lesson", location: "UP", boundary: 0.0, longitude: 0.0, latitude: 0.0, dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "0", childId:"8675945310542"};
  const emptyDescription = {activityName: "AI", description: "", location: "UP", boundary: 0.0, longitude: 0.0, latitude: 0.0, dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "0", childId:"8675945310542"};
  const emptyLocation = {activityName: "AI", description: "AI Lesson", location: "", boundary: 0.0, longitude: 0.0, latitude: 0.0, dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "0", childId:"8675945310542"};
  const emptyBoundary = {activityName: "AI", description: "AI Lesson", location: "", boundary: "", longitude: 0.0, latitude: 0.0, dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "0", childId:"8675945310542"};
  const emptyDay = {activityName: "AI", description: "AI Lesson", location: "UP", boundary: 0.0, longitude: 0.0, latitude: 0.0, dayOfWeek: "", timeSlot: "13:00-14:00", budget: "0", childId:"8675945310542"};
  const emptyTime = {activityName: "AI", description: "AI Lesson", location: "UP", boundary: 0.0, longitude: 0.0, latitude: 0.0, dayOfWeek: "Wednesday", timeSlot: "", budget: "0", childId:"8675945310542"};
  const emptyBudget = {activityName: "AI", description: "AI Lesson", location: "UP", boundary: 0.0, longitude: 0.0, latitude: 0.0, dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "", childId:"8675945310542"};
  const emptyChild = {activityName: "AI", description: "AI Lesson", location: "UP", boundary: 0.0, longitude: 0.0, latitude: 0.0, dayOfWeek: "Wednesday", timeSlot: "13:00-14:00", budget: "0", childId:""};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentAddActivityComponent],
      imports: [FormsModule,
         IonicModule,
         HttpClientTestingModule,
         NavbarModule,
         RouterTestingModule,
         NgxsModule.forRoot([AppState])
        ],
        providers:[API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentAddActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Empty fields form testing**/
  it('should, given a form with no activity name, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "",
      description: "",
      location: "",
      boundary: 0.0,
      longitude: 0.0,
      latitude: 0.0,
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
      location: "",
      boundary: 0.0,
      longitude: 0.0,
      latitude: 0.0,
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
      location: "",
      boundary: 0.0,
      longitude: 0.0,
      latitude: 0.0,
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

  it('should, given a form with no boundary, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "",
      description: "",
      location: "",
      boundary: 0.0,
      longitude: 0.0,
      latitude: 0.0,
      timeStart: "",
      timeEnd: "",
      budget: 0.0,
      comment: "",
      behavior: 0,
      day: "",
      child: "",
    };

    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(emptyBoundary);

    expect(component.activityDetails).toEqual(expectedValue);
  })

  it('should, given a form with no day of the week selected, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "",
      description: "",
      location: "",
      boundary: 0.0,
      longitude: 0.0,
      latitude: 0.0,
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
      location: "",
      boundary: 0.0,
      longitude: 0.0,
      latitude: 0.0,
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
      location: "",
      boundary: 0.0,
      longitude: 0.0,
      latitude: 0.0,
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
      location: "",
      boundary: 0.0,
      longitude: 0.0,
      latitude: 0.0,
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
});
