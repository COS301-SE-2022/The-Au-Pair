import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ParentAddActivityComponent } from './parent-add-activity.component';
import { Activity } from '../../../../shared/interfaces/activity.interfaces';
import { API } from '../../../../shared/api/api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';


describe('ParentAddActivityComponent', () => {
  let component: ParentAddActivityComponent;
  let fixture: ComponentFixture<ParentAddActivityComponent>;
  const populatedForm = {activityName: "input", description: "input", location: "input", dayOfWeek: "input", timeSlot: "09:00-10:00", budget: "0", childId:"input"};
  const EmptyFieldsForm = {activityName: "", description: "input", location: "input", dayOfWeek: "input", timeSlot: "input", budget: "0", childId:"input"};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentAddActivityComponent],
      imports: [FormsModule,
         IonicModule,
         HttpClientTestingModule,
         NavbarModule,
         RouterTestingModule
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

  it('should, given valid input from the form, poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "input",
      description: "input",
      location:"input",
      timeStart: "09:00",
      timeEnd: "10:00",
      budget: 0.0,
      comment: "",
      behavior: "",
      day: "input",
      child: "input",
    };

    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(populatedForm);

    expect(component.activityDetails).toEqual(expectedValue);
  })

  it('should, given an input with any number of empty fields from the form, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Activity = {
      id: "",
      name: "",
      description: "",
      location:"",
      timeStart: "",
      timeEnd: "",
      budget: 0.0,
      comment: "",
      behavior: "",
      day: "",
      child: "",
    };

    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(EmptyFieldsForm);

    expect(component.activityDetails).toEqual(expectedValue);
  })
});
