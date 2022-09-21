import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { AddChildComponent } from './add-child.component';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { IonicModule } from '@ionic/angular';
import { Child } from '../../../../shared/interfaces/interfaces';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';

describe('AddChildComponent', () => {
  let component: AddChildComponent;
  let fixture: ComponentFixture<AddChildComponent>;

  //Valid form
  const populatedForm = {childName: "name", surname: "surname", dob:"2015-10-10", Allergies: "none", diet: "none"};

  //Invalid forms
  const emptyID = {childName: "name", surname: "surname", dob:"2015-10-10",  Allergies: "none", diet: "none"};
  const emptyFirstName = {childName: "", surname: "surname", dob:"2015-10-10",  Allergies: "none", diet: "none"};
  const emptySurname = {childName: "name", surname: "", dob:"2015-10-10", Allergies: "none", diet: "none"};
  const emptyAllergies = {childName: "name", surname: "surname", dob:"2015-10-10",  Allergies: "", diet: "none"};
  const emptyDiet = {childName: "name", surname: "surname", dob:"2015-10-10",  Allergies: "none", diet: ""};
  const emptyDob = {childName: "name", surname: "surname", dob:"",  Allergies: "none", diet: ""};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddChildComponent],
      imports: [FormsModule,
        IonicModule,
        HttpClientTestingModule,
        NavbarModule,
        RouterTestingModule,
        NgxsModule.forRoot([AppState])
    ],
    providers: [API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Populated form fields form testing**/
  it('should, given valid input from the form, update the activityDetails variable', async ()=>{
    const expectedValue: Child = {
      id: "",
      fname: "",
      sname: "",
      dob: "",
      allergies: "",
      diet: "",
      parent: "",
      aupair: "",
    };

    component.allChildren = [expectedValue];  
    
    jest.spyOn(component,"getChildValues");

    await component.getChildValues(populatedForm);

    expect(component.childDetails).toEqual(expectedValue);
  })

  it('should call addChild function if the form contains valid details', async ()=>{
    const tempChild: Child = {
      id: "",
      fname: "",
      sname: "",
      dob: "",
      allergies: "",
      diet: "",
      parent: "",
      aupair: "",
    };

    jest.spyOn(component,"addChild");
    component.allChildren = [tempChild];
    await component.getChildValues(populatedForm);
    expect(component.addChild).toHaveBeenCalled();
  })

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Invalid fields form testing**/

  it('should, given a form with no childID, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Child = {
      id: "",
      fname: "",
      sname: "",
      dob: "",
      allergies: "",
      diet: "",
      parent: "",
      aupair: "",
    };

    component.allChildren = [expectedValue];

    jest.spyOn(component,"getChildValues");

    await component.getChildValues(emptyID);

    expect(component.childDetails).toEqual(expectedValue);
  })


  it('should, given a form with no first name, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Child = {
      id: "",
      fname: "",
      sname: "",
      dob: "",
      allergies: "",
      diet: "",
      parent: "",
      aupair: "",
    };

    component.allChildren = [expectedValue];

    jest.spyOn(component,"getChildValues");

    await component.getChildValues(emptyFirstName);

    expect(component.childDetails).toEqual(expectedValue);
  })

  it('should, given a form with no Surname, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Child = {
      id: "",
      fname: "",
      sname: "",
      dob: "",
      allergies: "",
      diet: "",
      parent: "",
      aupair: "",
    };

    component.allChildren = [expectedValue];

    jest.spyOn(component,"getChildValues");

    await component.getChildValues(emptySurname);

    expect(component.childDetails).toEqual(expectedValue);
  })

  it('should, given a form with no Date Of Birth, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Child = {
      id: "",
      fname: "",
      sname: "",
      dob: "",
      allergies: "",
      diet: "",
      parent: "",
      aupair: "",
    };

    component.allChildren = [expectedValue];

    jest.spyOn(component,"getChildValues");

    await component.getChildValues(emptyDob);

    expect(component.childDetails).toEqual(expectedValue);
  })


  it('should, given a form with no allergies entered, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Child = {
      id: "",
      fname: "",
      sname: "",
      dob: "",
      allergies: "",
      diet: "",
      parent: "",
      aupair: "",
    };

    component.allChildren = [expectedValue];

    jest.spyOn(component,"getChildValues");

    await component.getChildValues(emptyAllergies);

    expect(component.childDetails).toEqual(expectedValue);
  })


  it('should, given a form with no diet, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Child = {
      id: "",
      fname: "",
      sname: "",
      dob: "",
      allergies: "",
      diet: "",
      parent: "",
      aupair: "",
    };

    component.allChildren = [expectedValue];
    jest.spyOn(component,"getChildValues");
    await component.getChildValues(emptyDiet);
    expect(component.childDetails).toEqual(expectedValue);
  })

});
