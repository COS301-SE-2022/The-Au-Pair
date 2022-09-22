import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HireRequestsComponent } from './hire-requests.component';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { of } from 'rxjs';
import { SetId } from 'libs/shared/ngxs/actions';
import { JobSummaryModalComponent } from './job-summary-modal/job-summary-modal.component';
import { CommonModule } from '@angular/common';

const apiMock = {
  getUser(){
    return of({})
  },
  getAuPair() {
    return of({})
  },
  getAllContracts(){
    return of({})
  },
  getParent() {
    return of({})
  },
  getChildren() {
    return of({})
  },
  forEach() {
    return of({})
  },
  editAuPair() {
    return of({})
  },
  editParent() {
    return of({})
  },
  removeContract() {
    return of({})
  }
}

describe('HireRequestsComponent', () => {
  let component: HireRequestsComponent;
  let fixture: ComponentFixture<HireRequestsComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HireRequestsComponent],
      imports: [FormsModule,
        IonicModule,
        NavbarModule,
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(HireRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
    expect(component.auPairID).toEqual("0101015077086");
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
    expect(component.auPairID).toEqual("0101015077086");
  })

  it('should, return the contract details from the api call', async () => {
    store.dispatch(new SetId("0101015077086"));
    jest.spyOn(apiMock, 'getAllContracts').mockImplementation(()=>of(
      {
        id: "asdsdgfertgretv",
        parentID: "0101015077088",
        auPairID: "0101015077086",
        timestamp: "2022/9/20 - 11:03",
        parentName: "TestFN",
        parentSurname: "TestSN",
        parentEmployee: "",
        auPairEmployer: "",
      }
    ));

    await component.ngOnInit();
    expect(component.auPairID).toEqual("0101015077086");
  })

  it('should,open the modal when called', async ()=>{
    jest.spyOn(component,"openModal");
    component.openModal("dxzv6chgn5zp19ezfiqn7fxf", "dxzv6chgn5zp19ezfiqn7vfx");
    expect(await component.openModal).toReturn();
  });
});
  

describe('JobSummaryModal', () => {
  let component: JobSummaryModalComponent;
  let fixture: ComponentFixture<JobSummaryModalComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobSummaryModalComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule, FormsModule,NgxsModule.forRoot([AppState])],
      providers: [
      {
        provide:API, useValue:apiMock
      }, 
      ToastController, 
      ModalController]
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSummaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should, open a toast when openToast is called', async ()=>{
    jest.spyOn(component,"sucToast");
    component.sucToast();
    expect(await component.sucToast).toReturn();
  });

  it('should,close the modal when closeModal is called', async ()=>{
    jest.spyOn(component,"closeModal");
    component.closeModal();
    expect(await component.closeModal).toReturn();
  });

  it('should, calculate an average rating of the au pair from their rating array given a valid array', async () =>{
    const expectedRating = 4;
    jest.spyOn(component, "getAverage").mockReturnValue(4);
    const average = await component.getAverage([3,5]);
    expect(average).toEqual(expectedRating);
  })

  it('should, return zero rating array given an empty array', async () =>{
    const expectedRating = 0;
    jest.spyOn(component, "getAverage").mockReturnValue(0);
    const average = await component.getAverage([]);
    expect(average).toEqual(expectedRating);
  })

  it('should, return zero rating array given an invalid array', async () =>{
    const expectedRating = 0;
    jest.spyOn(component, "getAverage").mockReturnValue(0);
    const average = await component.getAverage([0, -5, 6]);
    expect(average).toEqual(expectedRating);
  })

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
    expect(component.auPairID).toEqual("0101015077086");
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
    expect(component.auPairID).toEqual("0101015077086");
  })

  it('should, return the parent users details from the api call', async () => {
    store.dispatch(new SetId("0101015077086"));
    jest.spyOn(apiMock, 'getUser').mockImplementation(()=>of(
      {
        id: "0101015077086",
        fname: "TestFN",
        sname: "TestSN",
        email: "test@gmail.com",
        address: "Test 123",
        registered: true,
        type: 1,
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
  })

  it('should, return the parents details from the api call', async () => {
    store.dispatch(new SetId("0101015077086"));
    jest.spyOn(apiMock, 'getParent').mockImplementation(()=>of(
      {
        id: "0101015077086",
        children: [],
        medID: "",
        auPair: "",
        rating: [5]
      }
    ));

    await component.ngOnInit();
  })

  it('should, call sucToast if the request is accepted', async ()=>{
    jest.spyOn(component,"sucToast");
    await component.acceptRequest();
    expect(component.sucToast).toHaveBeenCalled();
  })

  it('should, call closeModal if the request is accepted', async ()=>{
    jest.spyOn(component,"closeModal");
    await component.acceptRequest();
    expect(component.closeModal).toHaveBeenCalled();
  })

  it('should, return the age from a given date', async () =>{
    const expectedAge = 18;
    jest.spyOn(component, "getAge").mockReturnValue(18);
    const age = await component.getAge('05/07/2004');
    expect(age).toEqual(expectedAge);
  })

});
