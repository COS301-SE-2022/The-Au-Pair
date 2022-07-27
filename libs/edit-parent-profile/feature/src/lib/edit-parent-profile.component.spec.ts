import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { User, medAid } from '../../../../shared/interfaces/interfaces';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import {RouterTestingModule} from "@angular/router/testing";
import { EditParentProfileComponent } from './edit-parent-profile.component';

describe('EditParentProfileComponent', () => {
  let component: EditParentProfileComponent;
  let fixture: ComponentFixture<EditParentProfileComponent>;

  // A valid form of correct values
  const validForm = {email: "testemail@gmail.com", phone: "0832422323", address: "123 Valid Street", medicalAidMM: "Kyle", medicalAidMS: "Pottinger", medicalAidNo: "7534286951", medicalAidProvider: "Discovery", medicalAidPlan: "Full"}

  // Forms that have at least one missing field
  const emptyEmail = {email: "", phone: "0832422323", address: "123 Valid Street", medicalAidMM: "Kyle", medicalAidMS: "Pottinger", medicalAidNo: "7534286951", medicalAidProvider: "Discovery", medicalAidPlan: "Full"}
  const emptyPhone = {email: "testemail@gmail.com", phone: "", address: "123 Valid Street", medicalAidMM: "Kyle", medicalAidMS: "Pottinger", medicalAidNo: "7534286951", medicalAidProvider: "Discovery", medicalAidPlan: "Full"}
  const emptyAddress = {email: "testemail@gmail.com", phone: "0832422323", address: "", medicalAidMM: "Kyle", medicalAidMS: "Pottinger", medicalAidNo: "7534286951", medicalAidProvider: "Discovery", medicalAidPlan: "Full"}
  const emptyMedAidMM = {email: "testemail@gmail.com", phone: "0832422323", address: "123 Valid Street", medicalAidMM: "", medicalAidMS: "Pottinger", medicalAidNo: "7534286951", medicalAidProvider: "Discovery", medicalAidPlan: "Full"}
  const emptyMedAidMS = {email: "testemail@gmail.com", phone: "0832422323", address: "123 Valid Street", medicalAidMM: "Kyle", medicalAidMS: "", medicalAidNo: "7534286951", medicalAidProvider: "Discovery", medicalAidPlan: "Full"}
  const emptyMedAidNo = {email: "testemail@gmail.com", phone: "0832422323", address: "123 Valid Street", medicalAidMM: "Kyle", medicalAidMS: "Pottinger", medicalAidNo: "", medicalAidProvider: "Discovery", medicalAidPlan: "Full"}
  const emptyMedAidProvider = {email: "testemail@gmail.com", phone: "0832422323", address: "123 Valid Street", medicalAidMM: "Kyle", medicalAidMS: "Pottinger", medicalAidNo: "7534286951", medicalAidProvider: "", medicalAidPlan: "Full"}
  const emptyMedAidPlan = {email: "testemail@gmail.com", phone: "0832422323", address: "123 Valid Street", medicalAidMM: "Kyle", medicalAidMS: "Pottinger", medicalAidNo: "7534286951", medicalAidProvider: "Discovery", medicalAidPlan: ""}

  // Invalid User
  const invalidUser = {id: "invalidId", fname: "Kyle", sname: "Pottinger", email: "testemail@gmail.com", address: "123 Valid Street", registered: false, type: 0, password: "test", number: "0832422323", salt: "mrs", latitude: 20, longitude: 20, suburb: 'Midrand', gender: "male", age: 20}

  // Invalid Med Aid
  const invalidMedAid = {id: "invalidId", plan: "Full", name: "Kyle", sname: "Pottinger", mID: "7534286951", provider: "Discovery"}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditParentProfileComponent],
      imports: [FormsModule,
        IonicModule,
        HttpClientTestingModule,
        NavbarModule,
        RouterTestingModule,
    ],
    providers: [API]
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditParentProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Testing the services**/
  /*Testing for invalid user IDs*/
  it('should, when editUser() is called with an invalid user ID, return an error from the API', async ()=>{
    const expectedValue = undefined;
    jest.spyOn(component,"editUser");
    expect(await component.editUser(invalidUser)).toEqual(expectedValue);
  })

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Testing the services**/
  /*Testing for invalid user IDs*/
  it('should, when editMedAid() is called with an invalid medAid ID, return an error from the API', async ()=>{
    const expectedValue = undefined;
    jest.spyOn(component,"editMedAid");
    expect(await component.editMedAid(invalidMedAid)).toEqual(expectedValue);
  })

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Populated form fields form testing**/
  it('should, given valid input from the form, update the userDetails and medAidDetails variable', async ()=>{
    const expectedUserValue: User = {
      id: "",
      fname: "",
      sname: "",
      email: "testemail@gmail.com",
      address: "123 Valid Street",
      registered: false,
      type: 0,
      password: "",
      number: "0832422323",
      salt: "",
      latitude: 0, 
      longitude: 0, 
      suburb: "", 
      gender: "", 
      age: 0,
    };

    const expectedMedAidValue: medAid = {
      id: "",
      plan: "Full",
      name: "Kyle",
      sname: "Pottinger",
      mID: "7534286951",
      provider: "Discovery",
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(validForm);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(validForm);
    expect(component.medAidDetails).toEqual(expectedMedAidValue);
  })

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Empty fields form testing**/
  it('should, given a form with no email, NOT poplate the userDetails or medAidDetails variable', async ()=>{
    const expectedUserValue: User = {
      id: "",
      fname: "",
      sname: "",
      email: "",
      address: "",
      registered: false,
      type: 0,
      password: "",
      number: "",
      salt: "",
      latitude: 0, 
      longitude: 0, 
      suburb: "", 
      gender: "", 
      age: 0,
    };

    const expectedMedAidValue: medAid = {
      id: "",
      plan: "",
      name: "",
      sname: "",
      mID: "",
      provider: "",
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyEmail);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyEmail);
    expect(component.medAidDetails).toEqual(expectedMedAidValue);
  })

  it('should, given a form with no phone number, NOT poplate the userDetails or medAidDetails variable', async ()=>{
    const expectedUserValue: User = {
      id: "",
      fname: "",
      sname: "",
      email: "",
      address: "",
      registered: false,
      type: 0,
      password: "",
      number: "",
      salt: "",
      latitude: 0, 
      longitude: 0, 
      suburb: "", 
      gender: "", 
      age: 0,
    };

    const expectedMedAidValue: medAid = {
      id: "",
      plan: "",
      name: "",
      sname: "",
      mID: "",
      provider: "",
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyPhone);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyPhone);
    expect(component.medAidDetails).toEqual(expectedMedAidValue);
  })

  it('should, given a form with no address, NOT poplate the userDetails or medAidDetails variable', async ()=>{
    const expectedUserValue: User = {
      id: "",
      fname: "",
      sname: "",
      email: "",
      address: "",
      registered: false,
      type: 0,
      password: "",
      number: "",
      salt: "",
      latitude: 0, 
      longitude: 0, 
      suburb: "", 
      gender: "", 
      age: 0,
    };

    const expectedMedAidValue: medAid = {
      id: "",
      plan: "",
      name: "",
      sname: "",
      mID: "",
      provider: "",
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyAddress);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyAddress);
    expect(component.medAidDetails).toEqual(expectedMedAidValue);
  })

  it('should, given a form with no medicalAidMM, NOT poplate the userDetails or medAidDetails variable', async ()=>{
    const expectedUserValue: User = {
      id: "",
      fname: "",
      sname: "",
      email: "",
      address: "",
      registered: false,
      type: 0,
      password: "",
      number: "",
      salt: "",
      latitude: 0, 
      longitude: 0, 
      suburb: "", 
      gender: "", 
      age: 0,
    };

    const expectedMedAidValue: medAid = {
      id: "",
      plan: "",
      name: "",
      sname: "",
      mID: "",
      provider: "",
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyMedAidMM);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyMedAidMM);
    expect(component.medAidDetails).toEqual(expectedMedAidValue);
  })

  it('should, given a form with no medicalAidMS, NOT poplate the userDetails or medAidDetails variable', async ()=>{
    const expectedUserValue: User = {
      id: "",
      fname: "",
      sname: "",
      email: "",
      address: "",
      registered: false,
      type: 0,
      password: "",
      number: "",
      salt: "",
      latitude: 0, 
      longitude: 0, 
      suburb: "", 
      gender: "", 
      age: 0,
    };

    const expectedMedAidValue: medAid = {
      id: "",
      plan: "",
      name: "",
      sname: "",
      mID: "",
      provider: "",
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyMedAidMS);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyMedAidMS);
    expect(component.medAidDetails).toEqual(expectedMedAidValue);
  })

  it('should, given a form with no medicalAiNo, NOT poplate the userDetails or medAidDetails variable', async ()=>{
    const expectedUserValue: User = {
      id: "",
      fname: "",
      sname: "",
      email: "",
      address: "",
      registered: false,
      type: 0,
      password: "",
      number: "",
      salt: "",
      latitude: 0, 
      longitude: 0, 
      suburb: "", 
      gender: "", 
      age: 0,
    };

    const expectedMedAidValue: medAid = {
      id: "",
      plan: "",
      name: "",
      sname: "",
      mID: "",
      provider: "",
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyMedAidNo);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyMedAidNo);
    expect(component.medAidDetails).toEqual(expectedMedAidValue);
  })

  it('should, given a form with no medicalAidProvider, NOT poplate the userDetails or medAidDetails variable', async ()=>{
    const expectedUserValue: User = {
      id: "",
      fname: "",
      sname: "",
      email: "",
      address: "",
      registered: false,
      type: 0,
      password: "",
      number: "",
      salt: "",
      latitude: 0, 
      longitude: 0, 
      suburb: "", 
      gender: "", 
      age: 0,
    };

    const expectedMedAidValue: medAid = {
      id: "",
      plan: "",
      name: "",
      sname: "",
      mID: "",
      provider: "",
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyMedAidProvider);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyMedAidProvider);
    expect(component.medAidDetails).toEqual(expectedMedAidValue);
  })

  it('should, given a form with no medicalAidPlan, NOT poplate the userDetails or medAidDetails variable', async ()=>{
    const expectedUserValue: User = {
      id: "",
      fname: "",
      sname: "",
      email: "",
      address: "",
      registered: false,
      type: 0,
      password: "",
      number: "",
      salt: "",
      latitude: 0, 
      longitude: 0, 
      suburb: "", 
      gender: "", 
      age: 0,
    };

    const expectedMedAidValue: medAid = {
      id: "",
      plan: "",
      name: "",
      sname: "",
      mID: "",
      provider: "",
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyMedAidPlan);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyMedAidPlan);
    expect(component.medAidDetails).toEqual(expectedMedAidValue);
  })
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
});
