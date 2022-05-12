import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ParentAddActivityComponent, Activity } from './parent-add-activity.component';

describe('ParentAddActivityComponent', () => {
  let component: ParentAddActivityComponent;
  let fixture: ComponentFixture<ParentAddActivityComponent>;
  const populatedForm = {activityName: "input", description: "input", location: "input", dayOfWeek: "input", timeSlot: "input", budget: "0", childId:"input"};
  const EmptyFieldsForm = {activityName: "", description: "input", location: "input", dayOfWeek: "input", timeSlot: "input", budget: "0", childId:"input"};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentAddActivityComponent],
      imports: [FormsModule, IonicModule]
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
    const expectedValue = new Activity("input", "input", "input", "input", "input", 0, "input");
    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(populatedForm);

    expect(component.activityDetails).toEqual(expectedValue);
  })

  it('should, given an input with any number of empty fields from the form, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue = <Activity>{};
    jest.spyOn(component,"getActivityValues");

    await component.getActivityValues(EmptyFieldsForm);

    expect(component.activityDetails).toEqual(expectedValue);
  })
});
