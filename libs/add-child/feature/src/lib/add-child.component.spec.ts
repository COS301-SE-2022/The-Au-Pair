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
  const populatedForm = {childID: "0101011234098", childName: "name", surname: "surname", Allergies: "none", diet: "none"};

  //Invalid forms
  const invalidSA_ID = {childID: "99999911234098", childName: "name", surname: "surname", Allergies: "none", diet: "none"};
  const emptyID = {childID: "", childName: "name", surname: "surname", Allergies: "none", diet: "none"};
  const emptyFirstName = {childID: "0101011234098", childName: "", surname: "surname", Allergies: "none", diet: "none"};
  const emptySurname = {childID: "0101011234098", childName: "name", surname: "", Allergies: "none", diet: "none"};
  const emptyAllergies = {childID: "0101011234098", childName: "name", surname: "surname", Allergies: "", diet: "none"};
  const emptyDiet = {childID: "0101011234098", childName: "name", surname: "surname", Allergies: "none", diet: ""};

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
      id: "0101011234098",
      fname: "name",
      sname: "surname",
      allergies: "none",
      diet: "none",
      parent: "",
      aupair: ''
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
      allergies: "",
      diet: "",
      parent: "",
      aupair: ''
    };

    jest.spyOn(component,"addChild");
    component.allChildren = [tempChild];
    await component.getChildValues(populatedForm);
    expect(component.addChild).toHaveBeenCalled();
  })

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Invalid fields form testing**/

  it('should, given a form with invalid South African ID, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Child = {
      id: "",
      fname: "",
      sname: "",
      allergies: "",
      diet: "",
      parent: "",
      aupair: ''
    };

    component.allChildren = [expectedValue];

    jest.spyOn(component,"getChildValues");

    await component.getChildValues(invalidSA_ID);

    expect(component.childDetails).toEqual(expectedValue);
  })

  it('should, given a form with no childID, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Child = {
      id: "",
      fname: "",
      sname: "",
      allergies: "",
      diet: "",
      parent: "",
      aupair: ''
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
      allergies: "",
      diet: "",
      parent: "",
      aupair: ''
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
      allergies: "",
      diet: "",
      parent: "",
      aupair: ''
    };

    component.allChildren = [expectedValue];

    jest.spyOn(component,"getChildValues");

    await component.getChildValues(emptySurname);

    expect(component.childDetails).toEqual(expectedValue);
  })


  it('should, given a form with no allergies entered, NOT poplate the activityDetails variable', async ()=>{
    const expectedValue: Child = {
      id: "",
      fname: "",
      sname: "",
      allergies: "",
      diet: "",
      parent: "",
      aupair: ''
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
      allergies: "",
      diet: "",
      parent: "",
      aupair: ''
    };

    component.allChildren = [expectedValue];
    jest.spyOn(component,"getChildValues");
    await component.getChildValues(emptyDiet);
    expect(component.childDetails).toEqual(expectedValue);
  })

});
