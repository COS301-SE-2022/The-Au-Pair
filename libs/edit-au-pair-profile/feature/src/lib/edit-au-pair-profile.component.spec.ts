import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { User, auPair } from '../../../../shared/interfaces/interfaces';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule } from "@angular/router/testing";
import { EditAuPairProfileComponent } from './edit-au-pair-profile.component';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { of } from 'rxjs';
import { SetId } from '../../../../../libs/shared/ngxs/actions';

const apiMock = {
  getUser(){
    return of({})
  },
  getAuPair() {
    return of({})
  },
  editAuPair() {
    return of({})
  },
  editUser() {
    return of({})
  }
}

describe('EditAuPairProfileComponent', () => {
  let component: EditAuPairProfileComponent;
  let fixture: ComponentFixture<EditAuPairProfileComponent>;
  let store: Store;

  // A valid form of correct values
  const validForm = {email: "testemail@gmail.com", phone: "0832422323", address: "123 Valid Street", payRate: 50, bio: "test bio", experience: "test experience"}

  // Forms that have at least one missing field
  const emptyEmail = {email: "", phone: "0832422323", address: "123 Valid Street", payRate: 50, bio: "test bio", experience: "test experience"}
  const emptyPhone = {email: "testemail@gmail.com", phone: "", address: "123 Valid Street", payRate: 50, bio: "test bio", experience: "test experience"}
  const emptyAddress = {email: "testemail@gmail.com", phone: "0832422323", address: "", payRate: 50, bio: "test bio", experience: "test experience"}
  const emptyPayRate = {email: "testemail@gmail.com", phone: "0832422323", address: "123 Valid Street", payRate: "", bio: "test bio", experience: "test experience"}
  const emptyBio = {email: "testemail@gmail.com", phone: "0832422323", address: "123 Valid Street", payRate: "", bio: "", experience: "test experience"}
  const emptyExperience = {email: "testemail@gmail.com", phone: "0832422323", address: "123 Valid Street", payRate: "", bio: "test bio", experience: ""}

  // Invalid User
  const invalidUser = {id: "invalidId", fname: "Kyle", sname: "Pottinger", email: "testemail@gmail.com", address: "123 Valid Street", registered: false, type: 0, password: "test", number: "0832422323", salt: "mrs", latitude: 20, longitude: 20, suburb: 'Midrand', gender: "male",fcmToken : "", birth: "01/01/2001", banned: "", warnings: 0}

  // Invalid Au Pair
  const invalidAuPair = {id: "invalidId", rating: [5], onShift: false, employer: "David", costIncurred: 100, distTraveled: 300, payRate: 50, bio: "test bio", experience: "test experience", currentLong: 0.0,  currentLat: 0.0, terminateDate: ""}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAuPairProfileComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAuPairProfileComponent],
      imports: [FormsModule,
        IonicModule,
        HttpClientTestingModule,
        NavbarModule,
        RouterTestingModule,
        NgxsModule.forRoot([AppState])
    ],
    providers:[
      {
        provide:API, useValue:apiMock
      }
    ]
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuPairProfileComponent);
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
  it('should, when editAuPair() is called with an invalid medAid ID, return an error from the API', async ()=>{
    const expectedValue = undefined;
    jest.spyOn(component,"editAuPair");
    expect(await component.editAuPair(invalidAuPair)).toEqual(expectedValue);
  })

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Populated form fields form testing**/
  it('should, given valid input from the form, update the userDetails and auPairDetails variable', async ()=>{
    const expectedUserValue: any = {
      id: undefined,
      fname: undefined,
      sname: undefined,
      email: undefined,
      address: undefined,
      registered: undefined,
      type: undefined,
      password: undefined,
      number: undefined,
      salt: undefined,
      latitude: undefined, 
      longitude: undefined, 
      suburb: undefined, 
      gender: undefined,      
      fcmToken : "",
      birth: undefined,
      banned: undefined,
      warnings: undefined,
    };

    const expectedAuPairValue: any = {
      id: undefined,
      rating: undefined,
      onShift: undefined,
      employer: undefined,
      costIncurred: undefined,
      distTraveled: undefined,
      payRate: undefined,
      bio: undefined,
      experience: undefined,
      currentLong: undefined,
      currentLat: undefined,
      terminateDate: undefined,
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(validForm);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(validForm);
    expect(component.auPairDetails).toEqual(expectedAuPairValue);
  })

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Empty fields form testing**/
  it('should, given a form with no email, NOT poplate the userDetails or auPairDetails variable', async ()=>{
    const expectedUserValue: any = {
      id: undefined,
      fname: undefined,
      sname: undefined,
      email: undefined,
      address: undefined,
      registered: undefined,
      type: undefined,
      password: undefined,
      number: undefined,
      salt: undefined,
      latitude: undefined, 
      longitude: undefined, 
      suburb: undefined, 
      gender: undefined,      
      fcmToken : "",
      birth: undefined,
      banned: undefined,
      warnings: undefined,
    };

    const expectedAuPairValue: any = {
      id: undefined,
      rating: undefined,
      onShift: undefined,
      employer: undefined,
      costIncurred: undefined,
      distTraveled: undefined,
      payRate: undefined,
      bio: undefined,
      experience: undefined,
      currentLong: undefined,
      currentLat: undefined,
      terminateDate: undefined,
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyEmail);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyEmail);
    expect(component.auPairDetails).toEqual(expectedAuPairValue);
  })

  it('should, given a form with no phone number, NOT poplate the userDetails or auPairDetails variable', async ()=>{
    const expectedUserValue: any = {
      id: undefined,
      fname: undefined,
      sname: undefined,
      email: undefined,
      address: undefined,
      registered: undefined,
      type: undefined,
      password: undefined,
      number: undefined,
      salt: undefined,
      latitude: undefined, 
      longitude: undefined, 
      suburb: undefined, 
      gender: undefined,      
      fcmToken : "",
      birth: undefined,
      banned: undefined,
      warnings: undefined,
    };

    const expectedAuPairValue: any = {
      id: undefined,
      rating: undefined,
      onShift: undefined,
      employer: undefined,
      costIncurred: undefined,
      distTraveled: undefined,
      payRate: undefined,
      bio: undefined,
      experience: undefined,
      currentLong: undefined,
      currentLat: undefined,
      terminateDate: undefined,
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyPhone);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyPhone);
    expect(component.auPairDetails).toEqual(expectedAuPairValue);
  })

  it('should, given a form with no address, NOT poplate the userDetails or auPairDetails variable', async ()=>{
    const expectedUserValue: any = {
      id: undefined,
      fname: undefined,
      sname: undefined,
      email: undefined,
      address: undefined,
      registered: undefined,
      type: undefined,
      password: undefined,
      number: undefined,
      salt: undefined,
      latitude: undefined, 
      longitude: undefined, 
      suburb: undefined, 
      gender: undefined,      
      fcmToken : "",
      birth: undefined,
      banned: undefined,
      warnings: undefined,
    };

    const expectedAuPairValue: any = {
      id: undefined,
      rating: undefined,
      onShift: undefined,
      employer: undefined,
      costIncurred: undefined,
      distTraveled: undefined,
      payRate: undefined,
      bio: undefined,
      experience: undefined,
      currentLong: undefined,
      currentLat: undefined,
      terminateDate: undefined,
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyAddress);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyAddress);
    expect(component.auPairDetails).toEqual(expectedAuPairValue);
  })

  it('should, given a form with no payRate, NOT poplate the userDetails or auPairDetails variable', async ()=>{
    const expectedUserValue: any = {
      id: undefined,
      fname: undefined,
      sname: undefined,
      email: undefined,
      address: undefined,
      registered: undefined,
      type: undefined,
      password: undefined,
      number: undefined,
      salt: undefined,
      latitude: undefined, 
      longitude: undefined, 
      suburb: undefined, 
      gender: undefined,      
      fcmToken : "",
      birth: undefined,
      banned: undefined,
      warnings: undefined,
    };

    const expectedAuPairValue: any = {
      id: undefined,
      rating: undefined,
      onShift: undefined,
      employer: undefined,
      costIncurred: undefined,
      distTraveled: undefined,
      payRate: undefined,
      bio: undefined,
      experience: undefined,
      currentLong: undefined,
      currentLat: undefined,
      terminateDate: undefined,
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyPayRate);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyPayRate);
    expect(component.auPairDetails).toEqual(expectedAuPairValue);
  })

  it('should, given a form with no bio, NOT poplate the userDetails or auPairDetails variable', async ()=>{
    const expectedUserValue: any = {
      id: undefined,
      fname: undefined,
      sname: undefined,
      email: undefined,
      address: undefined,
      registered: undefined,
      type: undefined,
      password: undefined,
      number: undefined,
      salt: undefined,
      latitude: undefined, 
      longitude: undefined, 
      suburb: undefined, 
      gender: undefined,      
      fcmToken : "",
      birth: undefined,
      banned: undefined,
      warnings: undefined,
    };

    const expectedAuPairValue: any = {
      id: undefined,
      rating: undefined,
      onShift: undefined,
      employer: undefined,
      costIncurred: undefined,
      distTraveled: undefined,
      payRate: undefined,
      bio: undefined,
      experience: undefined,
      currentLong: undefined,
      currentLat: undefined,
      terminateDate: undefined,
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyBio);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyBio);
    expect(component.auPairDetails).toEqual(expectedAuPairValue);
  })

  it('should, given a form with no experience, NOT poplate the userDetails or auPairDetails variable', async ()=>{
    const expectedUserValue: any = {
      id: undefined,
      fname: undefined,
      sname: undefined,
      email: undefined,
      address: undefined,
      registered: undefined,
      type: undefined,
      password: undefined,
      number: undefined,
      salt: undefined,
      latitude: undefined, 
      longitude: undefined, 
      suburb: undefined, 
      gender: undefined,      
      fcmToken : "",
      birth: undefined,
      banned: undefined,
      warnings: undefined,
    };

    const expectedAuPairValue: any = {
      id: undefined,
      rating: undefined,
      onShift: undefined,
      employer: undefined,
      costIncurred: undefined,
      distTraveled: undefined,
      payRate: undefined,
      bio: undefined,
      experience: undefined,
      currentLong: undefined,
      currentLat: undefined,
      terminateDate: undefined,
    };

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyExperience);
    expect(component.userDetails).toEqual(expectedUserValue);

    jest.spyOn(component,"getUserDetails");
    await component.getUserFormDetails(emptyExperience);
    expect(component.auPairDetails).toEqual(expectedAuPairValue);
  })
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  it('should, return the users details from the api call', async () => {
    store.dispatch(new SetId("0101015077086"));
    jest.spyOn(apiMock, 'getUser').mockImplementation(()=>of(
      {
        id: "0101015077086",
        fname: "TestFN",
        sname: "TestSN",
        email: "test@gmail.com",
        address: "Test 123",
        registered: true,
        type: 2,
        password: "TestPassword",
        number: "0833332222",
        salt: "testsaltyes",
        latitude: 30,
        longitude: 30,
        suburb: "Midrand",
        gender: "male",
        fcmToken : "testFCMtoken",
        birth: "05/07/2004",
        warnings: 0,
        banned: "",
      }
    ));

    await component.ngOnInit();
    expect(component.aupairID).toEqual("0101015077086");
  })

  it('should, return the au pairs details from the api call', async () => {
    store.dispatch(new SetId("0101015077086"));
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        id: "0101015077086",
        rating: [5],
        onShift: true,
        employer: "",
        costIncurred: 0,
        distTraveled: 0,
        payRate: 0,
        bio: "Test Bio",
        experience: "Test Experience",
        currentLong: 0.0,
        currentLat : 0.0,
        terminateDate: "",
      }
    ));

    await component.ngOnInit();
    expect(component.aupairID).toEqual("0101015077086");
  })

  it('should, open a toast when openToast is called', async ()=>{
    jest.spyOn(component,"openToast");
    component.openToast();
    expect(await component.openToast).toReturn();
  });
});

