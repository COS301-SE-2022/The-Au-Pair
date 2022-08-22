import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { InputFieldModule } from '@the-au-pair/shared/components/input-field';
import { PasswordFieldModule } from '@the-au-pair/shared/components/password-field';
import { LocationFieldModule } from '@the-au-pair/shared/components/location-field';
import { LongFieldModule } from '@the-au-pair/shared/components/long-field';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './register.component';
import { API } from '../../../../shared/api/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import {of} from 'rxjs';
import { auPair, Parent, User } from 'libs/shared/interfaces/interfaces';

const httpMock = {
  get(url: string) {
      return of({})
  }
}

const apiMock = {
  register(user: User) {
    return of({})
  },
  addParent(parent: Parent) {
    return of({})
  },
  addAuPair(auPair: auPair) {
    return of({})
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  //Valid form
  const populatedForm = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "0828865065", id: "0101011234098", medAid: "Test aid 1234", location: "Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa", bio: "This is a test bio", experience: "Experience testing", pass: "TesterPass321!", confPass: "TesterPass321!" };

  // //Inalid form
  const invalidName = { name: "Test1", surname: "van Tester", email: "test@test.com", phone: "1234567890", id: "0101011234098", medAid: "Test aid 1234", location: "Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa", bio: "This is a test bio", experience: "Experience testing", pass: "TesterPass321!", confPass: "TesterPass321!" };
  const invalidSurname = { name: "Test", surname: "v0n Tester", email: "test@test.com", phone: "1234567890", id: "0101011234098", medAid: "Test aid 1234", location: "City of Tshwane Metropolitan Municipality, Gauteng, South Africa", bio: "This is a test bio", experience: "Experience testing", pass: "TesterPass321!", confPass: "TesterPass321!" };
  const invalidEmail = { name: "Test", surname: "van Tester", email: "test@@test.com", phone: "1234567890", id: "0101011234098", medAid: "Test aid 1234", location: "City of Tshwane Metropolitan Municipality, Gauteng, South Africa", bio: "This is a test bio", experience: "Experience testing", pass: "TesterPass321!", confPass: "TesterPass321!" };
  const invalidPhone = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "1222234567890", id: "0101011234098", medAid: "Test aid 1234", location: "City of Tshwane Metropolitan Municipality, Gauteng, South Africa", bio: "This is a test bio", experience: "Experience testing", pass: "TesterPass321!", confPass: "TesterPass321!" };
  const invalidId = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "1234567890", id: "010101123324098", medAid: "Test aid 1234", location: "City of Tshwane Metropolitan Municipality, Gauteng, South Africa", bio: "This is a test bio", experience: "Experience testing", pass: "TesterPass321!", confPass: "TesterPass321!" };
  const invalidLocation = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "1234567890", id: "0101011234098", medAid: "Test aid 1234", location: "Invalid", bio: "This is a test bio", experience: "Experience testing", pass: "TesterPass321!", confPass: "TesterPass321!" };
  const invalidPass = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "1234567890", id: "0101011234098", medAid: "Test aid 1234", location: "City of Tshwane Metropolitan Municipality, Gauteng, South Africa", bio: "This is a test bio", experience: "Experience testing", pass: "Test", confPass: "TesterPass321!" };
  const invalidConfPass = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "1234567890", id: "0101011234098", medAid: "Test aid 1234", location: "City of Tshwane Metropolitan Municipality, Gauteng, South Africa", bio: "This is a test bio", experience: "Experience testing", pass: "TesterPass321!", confPass: "YesterPass321!" };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        IonicModule,
        InputFieldModule,
        LocationFieldModule,
        PasswordFieldModule,
        LongFieldModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
      ],
      providers:[
        {
          provide:HttpClient, useValue:httpMock
        },
        {
          provide:API, useValue:apiMock
        }, 
        ToastController, 
        FormBuilder
      ],
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
    });

  });

  function inputRegistration(name : string, surname : string, email : string, phone : string, id : string, medAid : string, location : string, bio : string, experience : string, pass : string, confPass : string) {
    component.parentRegisterDetailsForm.controls['name'].setValue(name);
    component.parentRegisterDetailsForm.controls['surname'].setValue(surname);
    component.parentRegisterDetailsForm.controls['email'].setValue(email);
    component.parentRegisterDetailsForm.controls['phone'].setValue(phone);
    component.parentRegisterDetailsForm.controls['id'].setValue(id);
    component.parentRegisterDetailsForm.controls['medAid'].setValue(medAid);
    component.parentRegisterDetailsForm.controls['location'].setValue(location);
    component.parentRegisterDetailsForm.controls['experience'].setValue(experience);
    component.parentRegisterDetailsForm.controls['bio'].setValue(bio);
    component.parentRegisterDetailsForm.controls['pass'].setValue(pass);
    component.parentRegisterDetailsForm.controls['confPass'].setValue(confPass);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate fields on form input', () => {
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, populatedForm.medAid, populatedForm.location, populatedForm.bio, populatedForm.experience, populatedForm.pass, populatedForm.confPass);
    expect(component.parentRegisterDetailsForm.value).toEqual(populatedForm);
  });
  
  it('should make the form invalid on inputs ', () => {
    // Name incorrect
    inputRegistration(invalidName.name, invalidName.surname, invalidName.email, invalidName.phone, invalidName.id, invalidName.medAid, invalidName.location, invalidName.bio, invalidName.experience, invalidName.pass, invalidName.confPass);
    expect(component.formValid).toBeFalsy();

    // Surname incorrect
    inputRegistration(invalidSurname.name, invalidSurname.surname, invalidSurname.email, invalidSurname.phone, invalidSurname.id, invalidSurname.medAid, invalidSurname.location, invalidSurname.bio, invalidSurname.experience, invalidSurname.pass, invalidSurname.confPass);
    expect(component.formValid).toBeFalsy();

    // Email incorrect
    inputRegistration(invalidEmail.name, invalidEmail.surname, invalidEmail.email, invalidEmail.phone, invalidEmail.id, invalidEmail.medAid, invalidEmail.location, invalidEmail.bio, invalidEmail.experience, invalidEmail.pass, invalidEmail.confPass);
    expect(component.formValid).toBeFalsy();

    // Phone incorrect
    inputRegistration(invalidPhone.name, invalidPhone.surname, invalidPhone.email, invalidPhone.phone, invalidPhone.id, invalidPhone.medAid, invalidPhone.location, invalidPhone.bio, invalidPhone.experience, invalidPhone.pass, invalidPhone.confPass);
    expect(component.formValid).toBeFalsy();

    // ID incorrect
    inputRegistration(invalidId.name, invalidId.surname, invalidId.email, invalidId.phone, invalidId.id, invalidId.medAid, invalidId.location, invalidId.bio, invalidId.experience, invalidId.pass, invalidId.confPass);
    expect(component.formValid).toBeFalsy();

    // Location incorrect
    inputRegistration(invalidLocation.name, invalidLocation.surname, invalidLocation.email, invalidLocation.phone, invalidLocation.id, invalidLocation.medAid, invalidLocation.location, invalidLocation.bio, invalidLocation.experience, invalidLocation.pass, invalidLocation.confPass);
    expect(component.formValid).toBeFalsy();

    // Password incorrect
    inputRegistration(invalidPass.name, invalidPass.surname, invalidPass.email, invalidPass.phone, invalidPass.id, invalidPass.medAid, invalidPass.location, invalidPass.bio, invalidPass.experience, invalidPass.pass, invalidPass.confPass);
    expect(component.formValid).toBeFalsy();

    // Confirm Password incorrect
    inputRegistration(invalidConfPass.name, invalidConfPass.surname, invalidConfPass.email, invalidConfPass.phone, invalidConfPass.id, invalidConfPass.medAid, invalidConfPass.location, invalidConfPass.bio, invalidConfPass.experience, invalidConfPass.pass, invalidConfPass.confPass);
    expect(component.formValid).toBeFalsy();
  });

  it('should make the form invalid on specific parent and au pair inputs', () => {
    component.parentChosen = true;

    // Medical aid number empty for parent
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, "", populatedForm.location, populatedForm.bio, populatedForm.experience, populatedForm.pass, populatedForm.confPass);
    expect(component.formValid).toBeFalsy();

    component.parentChosen = false;
    // Bio empty for au pair
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, populatedForm.medAid, populatedForm.location, "", populatedForm.experience, populatedForm.pass, populatedForm.confPass);
    expect(component.formValid).toBeFalsy();

    // Experience empty for au pair
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, populatedForm.medAid, populatedForm.location, populatedForm.bio, "", populatedForm.pass, populatedForm.confPass);
    expect(component.formValid).toBeFalsy();
  });

  it('should register a parent based off of valid inputs', async () => {
    component.parentChosen = true;
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, populatedForm.medAid, populatedForm.location, populatedForm.bio, populatedForm.experience, populatedForm.pass, populatedForm.confPass);
    
    const toastSpy = jest.spyOn(component, 'openToast');
    jest.spyOn(httpMock, 'get').mockImplementation(()=>of(
      [{
        "address": {
          "suburb": "Midrand",
        },
        "display_name": "Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa",
        "lat" : -25.999262,
        "lon" : 28.125912
      }]
    ));

    jest.spyOn(apiMock, 'register').mockImplementation(()=>of(
      "pending"
    ));

    await component.registerUser();
    expect(toastSpy).toHaveBeenCalledWith("Registration successfull");
  });

  it('should give toasts if a user is banned or user already exists', async () => {
    component.parentChosen = true;
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, populatedForm.medAid, populatedForm.location, populatedForm.bio, populatedForm.experience, populatedForm.pass, populatedForm.confPass);
    
    const toastSpy = jest.spyOn(component, 'openToast');
    jest.spyOn(httpMock, 'get').mockImplementation(()=>of(
      [{
        "address": {
          "suburb": "Midrand",
        },
        "display_name": "Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa",
        "lat" : -25.999262,
        "lon" : 28.125912
      }]
    ));

    // A toast should pop up with reason a user was banned
    const banReason = "Banned for violating community guidelines"
    jest.spyOn(apiMock, 'register').mockImplementation(()=>of(
      banReason
    ));

    await component.registerUser();
    expect(toastSpy).toHaveBeenCalledWith("Email or ID has been banned : " + banReason);

    // A toast should pop up if a user already exists
    const usedEmail = "test@test.com"
    jest.spyOn(apiMock, 'register').mockImplementation(()=>of(
      usedEmail
    ));

    await component.registerUser();
    expect(toastSpy).toHaveBeenCalledWith("Account already exists with email : " + usedEmail);
  });


  it('should register an au pair based off of valid inputs', async () => {
    component.parentChosen = false;
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, populatedForm.medAid, populatedForm.location, populatedForm.bio, populatedForm.experience, populatedForm.pass, populatedForm.confPass);
    const toastSpy = jest.spyOn(component, 'openToast');

    jest.spyOn(httpMock, 'get').mockImplementation(()=>of(
      [{
        "address": {
          "suburb": "Midrand",
        },
        "display_name": "Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa",
        "lat" : -25.999262,
        "lon" : 28.125912
      }]
    ));

    jest.spyOn(apiMock, 'register').mockImplementation(()=>of(
      "pending"
    ));

    await component.registerUser();
    expect(toastSpy).toHaveBeenCalledWith("Registration succesfull pending approval");
  });

  it('should have registration fail with general invalid inputs', async () => {
    const toastSpy = jest.spyOn(component, 'openToast');

    // Location empty
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, populatedForm.medAid, "", populatedForm.bio, populatedForm.experience, populatedForm.pass, populatedForm.confPass);
    await component.registerUser();
    expect(component.formValid).toBeFalsy();

    jest.spyOn(httpMock, 'get').mockImplementation(()=>of(
      [{
        "address": {
          "suburb": "Midrand",
        },
        "display_name": "Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa",
        "lat" : -25.999262,
        "lon" : 28.125912
      }]
    ));

    // Location invalid
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, populatedForm.medAid, "Wrong location", populatedForm.bio, populatedForm.experience, populatedForm.pass, populatedForm.confPass);
    await component.registerUser();
    expect(component.locationError).toBeTruthy();
    expect(toastSpy).toHaveBeenCalledWith("Please select a valid location from the suggested below.");

    // Passwords don't match
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, populatedForm.medAid, populatedForm.location, populatedForm.bio, populatedForm.experience, "NotrightP@ass123", populatedForm.confPass);
    await component.registerUser();
    expect(component.notSamePasswords).toBeTruthy();

    // Genders get set
    component.maleChosen = true;
    await component.registerUser();
    expect(component.userDetails.gender).toEqual("male");

    component.maleChosen = false;
    await component.registerUser();
    expect(component.userDetails.gender).toEqual("female");
  });

  it('should have registration fail with invalid parent inputs', async () => {
    component.parentChosen = true;

    // Medical aid number empty for parent
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, "", populatedForm.location, populatedForm.bio, populatedForm.experience, populatedForm.pass, populatedForm.confPass);
    await component.registerUser();
    expect(component.medError).toBeTruthy();
  });

  it('should have registration fail with invalid au pair inputs', async () => {
    component.parentChosen = false;

    // Experience and bio empty for au pair
    inputRegistration(populatedForm.name, populatedForm.surname, populatedForm.email, populatedForm.phone, populatedForm.id, populatedForm.medAid, populatedForm.location, "", "", populatedForm.pass, populatedForm.confPass);
    await component.registerUser();
    expect(component.formValid).toBeFalsy();
    expect(component.bioError).toBeTruthy();
    expect(component.experienceError).toBeTruthy();
  });

  it('should update the longitude, latitude and suburb values', async () => {

    // Test setting the suburb
    jest.spyOn(httpMock, 'get').mockImplementation(()=>of(
          [{
            "address": {
              "suburb": "Midrand",
            },
            "display_name": "Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa",
            "lat" : -25.999262,
            "lon" : 28.125912
          }]
    ));
    await component.verifyLocation("Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa");

    expect(component.lat).toEqual(-25.999262);
    expect(component.long).toEqual(28.125912);
    expect(component.foundSuburb).toEqual("Midrand");

    // Test setting the suburb when the suburb is empty
    jest.spyOn(httpMock, 'get').mockImplementation(()=>of(
      [{
        "address": {
          "town": "Midrand",
        },
        "display_name": "Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa",
        "lat" : -25.999262,
        "lon" : 28.125912
      }]
    ));
    await component.verifyLocation("Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa");

    expect(component.lat).toEqual(-25.999262);
    expect(component.long).toEqual(28.125912);
    expect(component.foundSuburb).toEqual("Midrand");

    // Test setting the suburb when the suburb is empty and the town is empty
    jest.spyOn(httpMock, 'get').mockImplementation(()=>of(
      [{
        "address": {
          "city": "Midrand",
        },
        "display_name": "Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa",
        "lat" : -25.999262,
        "lon" : 28.125912
      }]
    ));

    await component.verifyLocation("Midrand, City of Johannesburg Metropolitan Municipality, Gauteng, 1685, South Africa");

    expect(component.lat).toEqual(-25.999262);
    expect(component.long).toEqual(28.125912);
    expect(component.foundSuburb).toEqual("Midrand");
  });

  it('should return a date string based off an ID number', () => {    
    // For 2000 ID number
    expect(component.convertIDtoDate("0101015077086")).toEqual("01/01/2001");

    // For 1900 ID number
    expect(component.convertIDtoDate("9901015077086")).toEqual("01/01/1999");
  });

});
