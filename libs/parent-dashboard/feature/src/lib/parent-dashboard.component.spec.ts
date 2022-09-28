import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParentDashboardComponent } from './parent-dashboard';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { API } from '../../../../shared/api/api.service';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { SetId, SetName } from '../../../../../libs/shared/ngxs/actions';
import { UserReportModalComponent } from './user-report-modal/user-report-modal.component';
import { AuPairRatingModalComponent } from './au-pair-rating-modal/au-pair-rating-modal.component';
import { Router } from '@angular/router';
import { auPair } from '../../../../../libs/shared/interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpMock = {
  post() {
      return of({})
  }
}

const apiMock = {
  getParent() {
    return of({})
  },
  addReport() {
    return of({})
  },
  getAuPair() {
    return of({})
  },
  editAuPair() {
    return of({})
  },
  getUser () {
    return of({})
  },
  sendEmail() {
    return of({})
  },
  getChildren() {
    return of({})
  },
  getFCMToken() {
    return of({})
  },
  editParent() {
    return of({})
  },
  logNotification() {
    return of({})
  },
}

describe('ParentProfileComponent', () => {
  let component: ParentDashboardComponent;
  let fixture: ComponentFixture<ParentDashboardComponent>;
  let store: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentDashboardComponent],
      imports: [FormsModule,
        IonicModule,
        HttpClientTestingModule,
        NavbarModule,
        RouterTestingModule,
        NgxsModule.forRoot([AppState])
       ],
       providers:[
        {
          provide:HttpClient, useValue:httpMock
        },
        {
          provide:API, useValue:apiMock
        },
        ModalController
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should,open the modal when called', async ()=>{
    jest.spyOn(component,"openModal");
    component.openModal("dxzv6chgn5zp19ezfiqn7fxf");
    expect(component.openModal).toReturn();
  });

  it('should,open the report modal when called', async ()=>{
    jest.spyOn(component,"openReportModal");
    component.openReportModal();
    expect(component.openReportModal).toReturn();
  });

  it('should, open the toast when called', async ()=>{
    jest.spyOn(component,"openToast");
    component.openToast("Test");
    expect(component.openToast).toReturn();
  });

  it('should set the details of au pairs and parents on init', async () => {
    store.dispatch(new SetId("123"));

    const getUserSpy = jest.spyOn(component, "getUserDetails");
    const getApSpy = jest.spyOn(component, "getAuPairDetails");
    const getChildrenSpy = jest.spyOn(component, "getChildren");
    
    jest.spyOn(apiMock, 'getParent').mockImplementation(()=>of(
      {
        id: "123",
        children: [],
        medID: "Test",
        auPair: "321",
        rating: [5,4]
      }
    ));

    jest.spyOn(apiMock, 'getUser').mockImplementation(()=>of(
      {
        id: "321",
        fname: "Test",
        sname: "Test",
        email: "test@test.com",
        address: "Test",
        registered: false,
        type: 0,
        password: "",
        number: "082",
        salt: "",
        latitude: 0,
        longitude: 0,
        suburb: "",
        gender: "",
        fcmToken : "",
        birth: "",
        warnings: 0,
        banned: "",
      }
    ));

    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        id: "321",
        rating: [5,5],
        onShift: false,
        employer: "123",
        costIncurred: 0,
        distTraveled: 0,
        payRate: 0,
        bio: "",
        experience: "",
        currentLong: 0.0,
        currentLat: 0.0,
        alreadyOutOfBounds: false,
        terminateDate: "",
      }
    ));


    await component.ngOnInit();
    expect(getUserSpy).toHaveBeenCalledWith("123");  
    expect(getChildrenSpy).toHaveBeenCalled(); 
    expect(getApSpy).toHaveBeenCalled(); 
    expect(component.umPoorID).toEqual("321");
    expect(component.auPairDetails).toEqual(
      {
        id: "321",
        fname: "Test",
        sname: "Test",
        email: "test@test.com",
        address: "Test",
        registered: false,
        type: 0,
        password: "",
        number: "082",
        salt: "",
        latitude: 0,
        longitude: 0,
        suburb: "",
        gender: "",
        fcmToken : "",
        birth: "",
        warnings: 0,
        banned: "",
      }
    );
  });

  it('should should populate the details of the children array', async () => {
    jest.spyOn(apiMock, 'getChildren').mockImplementation(()=>of(
      [
        {
          id: "1",
          fname: "Test",
          sname: "Test",
          dob: "",
          allergies: "",
          diet: "",
          parent: "123",
          aupair: "321"
        },
        {
          id: "2",
          fname: "Test2",
          sname: "Test2",
          dob: "",
          allergies: "",
          diet: "",
          parent: "123",
          aupair: "321"
        },
      ]
    ));

    await component.getChildren();
    expect(component.children).toEqual(
      [
        {
          id: "1",
          fname: "Test",
          sname: "Test",
          dob: "",
          allergies: "",
          diet: "",
          parent: "123",
          aupair: "321"
        },
        {
          id: "2",
          fname: "Test2",
          sname: "Test2",
          dob: "",
          allergies: "",
          diet: "",
          parent: "123",
          aupair: "321"
        },
      ]
    );
  });

  it('should, have a redirect to the children dashboard page', () => {
    const href = fixture.debugElement.query(By.css('#childDash')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/children-dashboard'); 
  });

  it('should, open the toast if there are no children', async () => {
    const toastSpy = jest.spyOn(component, 'openToast');
    await component.checkHasChildren();
    expect(toastSpy).toHaveBeenCalledWith("You have no children to assign activities to");
  });

  it('should navigate to add activity if there are children', async () => {
    component.parentDetails.children = ["1", "2"];
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');

    await component.checkHasChildren();
    
    expect(spy).toHaveBeenCalledWith(['/add-activity']);
  });

  it('should, open the toast if there is no schedule', async () => {
    const toastSpy = jest.spyOn(component, 'openToast');
    await component.checkHasChildrenSchedule();
    expect(toastSpy).toHaveBeenCalledWith("You have no childrens' schedules to view");
  });

  it('should navigate to schedule if there are children', async () => {
    component.parentDetails.children = ["1", "2"];
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');

    await component.checkHasChildrenSchedule();
    
    expect(spy).toHaveBeenCalledWith(['/schedule']);
  });

  it('should open the toast if there are no children', async () => {
    component.parentDetails.children = [];
    const toastSpy = jest.spyOn(component, 'openToast');
    await component.checkHasChildrenExplore();

    expect(toastSpy).toHaveBeenCalledWith('You need to have children added to your profile in order to hire an Au Pair');
  });

  it('should open the toast if there is no au pair', async () => {
    component.parentDetails.children = ["1", "2"];
    component.parentDetails.auPair = "123";
    const toastSpy = jest.spyOn(component, 'openToast');
    await component.checkHasChildrenExplore();

    expect(toastSpy).toHaveBeenCalledWith('You already have an Au Pair employed');
  });

  it('should navigate to explore if there are children and no au pair', async () => {
    component.parentDetails.children = ["1", "2"];
    component.parentDetails.auPair = "";

    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');

    await component.checkHasChildrenExplore();
    
    expect(spy).toHaveBeenCalledWith(['/explore']);
  });

  it('should open the toast if there is no au pair', async () => {
    const toastSpy = jest.spyOn(component, 'openToast');
    component.parentDetails.auPair = "";
    await component.checkHasEmployer();
    expect(toastSpy).toHaveBeenCalledWith('You do not have an Au Pair Employed');
  });

  it('should navigate to au pair cost if there is an au pair', async () => {
    component.parentDetails.auPair = "321";
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');

    await component.checkHasEmployer();
    
    expect(spy).toHaveBeenCalledWith(['/au-pair-cost']);
  });

  it('should open the toast if there is no au pair', async () => {
    const toastSpy = jest.spyOn(component, 'openToast');
    component.parentDetails.auPair = "";
    await component.checkHasEmployerTrack();
    expect(toastSpy).toHaveBeenCalledWith('You do not have an Au Pair Employed');
  });

  it('should navigate to au pair track if there is an au pair', async () => {
    component.parentDetails.auPair = "321";
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');

    await component.checkHasEmployerTrack();
    
    expect(spy).toHaveBeenCalledWith(['/track-au-pair']);
  });

  it('should terminate an au pair with fcm token', async ()=>{
    const apSpy = jest.spyOn(component,"getAuPairDetails");
    const childSpy = jest.spyOn(component,"removeChildrenAuPair");
    const updateApSpy = jest.spyOn(component,"updateAuPair");
    const updateParSpy = jest.spyOn(component,"updateParent");
    component.auPairDetails.email = "test@test.com";
    store.dispatch(new SetName("Test"));

    const httpSpy = jest.spyOn(httpMock,"post");

    jest.spyOn(apiMock, 'sendEmail').mockImplementation(()=>of(
      {}
    ));

    jest.spyOn(apiMock, 'getParent').mockImplementation(() => of(
      {
        id : "123",
        children : [],
        medID : "",
        auPair : "321",
        rating : [4,5]
      }
    ));

    jest.spyOn(apiMock, 'getFCMToken').mockImplementation(()=>of(
      "01"
    ));

    await component.terminateAuPair();

    const requestHeaders = new HttpHeaders().set('Authorization', 'key=AAAAlhtqIdQ:APA91bFlcYmdaqt5D_jodyiVQG8B1mkca2xGh6XKeMuTGtxQ6XKhSY0rdLnc0WrXDsV99grFamp3k0EVHRUJmUG9ULcxf-VSITFgwwaeNvrUq48q0Hn1GLxmZ3GBAYdCBzPFIRdbMxi9')

    expect(component.currentAuPair.terminateDate).toEqual("");
    expect(component.currentAuPair.employer).toEqual("");
    expect(component.currentAuPair.onShift).toBeFalsy();
    expect(component.parentDetails.auPair).toEqual("");

    expect(apSpy).toHaveBeenCalled();
    expect(childSpy).toHaveBeenCalled();
    expect(updateApSpy).toHaveBeenCalled();
    expect(updateParSpy).toHaveBeenCalled();

    expect(component.emailRequest.to).toEqual("test@test.com");
    expect(component.emailRequest.subject).toEqual("Au Pair Contract Termination");
    expect(component.emailRequest.body).toEqual("Unfortunately your employer has terminated your contract.\nYour profile will appear on our explore page again for new parent to make use of your services.\n\n" +
    "Regards,\nThe Au Pair Team");
    expect(httpSpy).toHaveBeenCalledWith('https://fcm.googleapis.com/fcm/send', 
    {
      "to": "01",
      "notification": {
        "title": "Employment Terminated",
        "body": "Employment with Test has been terminated.",
      }
    }, { headers: requestHeaders })
  });

  it('should, present the alert when called', async ()=>{
    jest.spyOn(component,"presentAlert");
    component.presentAlert();
    expect(await component.presentAlert).toReturn();
  });

  it('should, terminate the employment if 2 weeks have passed since resignation', async () => {
    const auPair1: auPair = {
      id: "0192835611234",
      rating: [1],
      onShift: false,
      employer: "0192835611235",
      costIncurred: 0,
      distTraveled: 0,
      payRate: 0,
      bio: "",
      experience: "",
      currentLong: 0.0,
      currentLat: 0.0,
      alreadyOutOfBounds: false,
      terminateDate: "2022-6-23",
    }

    jest.spyOn(component, "terminateAuPair");

    component.currentAuPair = auPair1;

    await component.checkResignation();

    expect(component.terminateAuPair).toHaveBeenCalled();
  })

  it('should, not terminate the employment if no terminate date is set', async () => {
    const auPair1: auPair = {
      id: "0192835611234",
      rating: [1],
      onShift: false,
      employer: "0192835611235",
      costIncurred: 0,
      distTraveled: 0,
      payRate: 0,
      bio: "",
      experience: "",
      currentLong: 0.0,
      currentLat: 0.0,
      alreadyOutOfBounds: false,
      terminateDate: "",
    }

    jest.spyOn(component, "terminateAuPair");

    component.currentAuPair = auPair1;

    await component.checkResignation();

    expect(component.terminateAuPair).toBeCalledTimes(0);
  })

  it('should, not terminate the employment if terminate date is within 2 weeks of resignation', async () => {
    const auPair1: auPair = {
      id: "0192835611234",
      rating: [1],
      onShift: false,
      employer: "0192835611235",
      costIncurred: 0,
      distTraveled: 0,
      payRate: 0,
      bio: "",
      experience: "",
      currentLong: 0.0,
      currentLat: 0.0,
      alreadyOutOfBounds: false,
      terminateDate: "2022-9-23",
    }

    jest.spyOn(component, "terminateAuPair");

    component.currentAuPair = auPair1;

    await component.checkResignation();

    expect(component.terminateAuPair).toBeCalledTimes(0);
  })

  it('should should populate the details of the parent', async () => {
    jest.spyOn(apiMock, 'getParent').mockImplementation(()=>of(
      {
        id: "123",
        children: ["1"],
        medID: "Test",
        auPair: "321",
        rating: [4,5]
      }
    ));

    await component.getParentDetails();
    expect(component.parentDetails).toEqual(
      {
        id: "123",
        children: ["1"],
        medID: "Test",
        auPair: "321",
        rating: [4,5]
      }
    );
  });

  it('should, return the age from a given date', async () =>{
    const expectedAge = 18;
    const age = await component.getAge('05/07/2004');
    expect(age).toEqual(expectedAge);
  })
});

describe('AuPairRatingModalComponent', () => {
  let component: AuPairRatingModalComponent;
  let fixture: ComponentFixture<AuPairRatingModalComponent>;
  let store: Store;

  const validForm = {rating: [5]}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairRatingModalComponent],
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
    fixture = TestBed.createComponent(AuPairRatingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should, open a toast when openToast is called', async ()=>{
    jest.spyOn(component,"openToast");
    component.openToast();
    expect(await component.openToast).toReturn();
  });

  it('should,close the modal when closeModal is called', async ()=>{
    jest.spyOn(component,"closeModal");
    component.closeModal();
    expect(await component.closeModal).toReturn();
  });

  it('should, when editAuPair() is called with an invalid auPair ID, return an error from the API', async ()=>{
    const expectedValue = undefined;
    jest.spyOn(component,"submitRating");
    expect(await component.submitRating()).toEqual(expectedValue);
  })

  it('should, call submitRating function if the form contains valid details', async ()=>{
    jest.spyOn(component,"submitRating");
    await component.getDescription(validForm);
    expect(component.submitRating).toHaveBeenCalled();
  })
});

describe('UserReportModalComponent', () => {
  let component: UserReportModalComponent;
  let fixture: ComponentFixture<UserReportModalComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserReportModalComponent],
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
    fixture = TestBed.createComponent(UserReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the parentID and auPairId on init', async () => {
    store.dispatch(new SetId("123"));
    jest.spyOn(apiMock, 'getParent').mockImplementation(()=>of(
      {
        auPair : "321",
      }
    ));

    await component.ngOnInit();
    expect(component.parentID).toEqual("123");
    expect(component.auPairId).toEqual("321");  
  });

  it('should send the report to the API', async () => {
    store.dispatch(new SetId("123"));
    jest.spyOn(apiMock, 'getParent').mockImplementation(()=>of(
      {
        auPair : "321",
      }
    ));

    await component.ngOnInit();
    
    const addRep = jest.spyOn(apiMock, 'addReport');
    jest.spyOn(component,"closeModal");
    const toast = jest.spyOn(component, 'openToast');
    addRep.mockImplementation(()=>of(
      true
    ));

    await component.reportUser({desc : "test"});
      
    expect(component.reportDetails.reportIssuerId).toEqual("123");
    expect(component.reportDetails.reportedUserId).toEqual("321");
    expect(component.reportDetails.desc).toEqual("test");
    expect(addRep).toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith("Report sent!");
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should, open a toast when openToast is called', async ()=>{
    jest.spyOn(component,"openToast");
    component.openToast("test");
    expect(await component.openToast).toReturn();
  });

  it('should,close the modal when closeModal is called', async ()=>{
    jest.spyOn(component,"closeModal");
    component.closeModal();
    expect(await component.closeModal).toReturn();
  });
});
