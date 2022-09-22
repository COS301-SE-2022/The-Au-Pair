import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { EditChildComponent } from './edit-child.component';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { IonicModule } from '@ionic/angular';
import { Child } from '../../../../shared/interfaces/interfaces';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';

describe('EditChildComponent', () => {
  let component: EditChildComponent;
  let fixture: ComponentFixture<EditChildComponent>;

  //Valid form
  const populatedForm = {childID: "0101011234098", childName: "name", surname: "surname", dateOfBirth:"2015-10-10", Allergies: "none", diet: "none"};

  //Invalid forms
  const emptyID = {childID: "", childName: "name", surname: "surname", dateOfBirth:"2015-10-10", Allergies: "none", diet: "none"};
  const emptyFirstName = {childID: "0101011234098", childName: "", surname: "surname", dateOfBirth:"2015-10-10", Allergies: "none", diet: "none"};
  const emptySurname = {childID: "0101011234098", childName: "name", surname: "", dateOfBirth:"2015-10-10", Allergies: "none", diet: "none"};
  const emptyAllergies = {childID: "0101011234098", childName: "name", surname: "surname", dateOfBirth:"2015-10-10", Allergies: "", diet: "none"};
  const emptyDiet = {childID: "0101011234098", childName: "name", surname: "surname", dateOfBirth:"2015-10-10", Allergies: "none", diet: ""};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditChildComponent],
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
    fixture = TestBed.createComponent(EditChildComponent);
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
      dob: "2015-10-10",
      allergies: "none",
      diet: "none",
      parent: "",
      aupair: ""
    };

    jest.spyOn(component,"getChildValues");

    await component.getChildValues(populatedForm);

    expect(component.childDetails).toEqual(expectedValue);
  })

  it('should call updateChild function if the form contains valid details', async ()=>{
    jest.spyOn(component,"updateChild");
    await component.getChildValues(populatedForm);
    expect(component.updateChild).toHaveBeenCalled();
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
      aupair: ''
    };

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
      aupair: ''
    };

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
      aupair: ''
    };

    jest.spyOn(component,"getChildValues");

    await component.getChildValues(emptySurname);

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
      aupair: ''
    };

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
      aupair: ''
    };

    jest.spyOn(component,"getChildValues");
    await component.getChildValues(emptyDiet);
    expect(component.childDetails).toEqual(expectedValue);
  })
});
