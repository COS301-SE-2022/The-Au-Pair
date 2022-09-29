import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterTestingModule} from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AuPairDashboardComponent } from './au-pair-dashboard.component';
import { API } from '../../../../shared/api/api.service';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { of } from 'rxjs';
import { SetId, SetName } from '../../../../../libs/shared/ngxs/actions';
import { UserReportModalComponent } from './user-report-modal/user-report-modal.component';
import { ParentRatingModalComponent } from './parent-rating-modal/parent-rating-modal.component';
import { Router } from '@angular/router';

const httpMock = {
  post() {
      return of({})
  }
}

const apiMock = {
  getAuPair() {
    return of({})
  },
  editAuPair() {
    return of({})
  },
  addReport() {
    return of({})
  },
  getParent() {
    return of({})
  },
  editParent() {
    return of({})
  },
  sendEmail() {
    return of({})
  },
  getStartedLog() {
    return of({})
  },
  getUser() {
    return of({})
  },
  getChildren() {
    return of({})
  },
  addTimeEnd() {
    return of({})
  },
  addHoursLog() {
    return of({})
  },
  getFCMToken() {
    return of({})
  },
  logNotification() {
    return of({})
  },
  updateChild() {
    return of({})
  },
}

describe('AuPairDashboardComponent', () => {
  let component: AuPairDashboardComponent;
  let fixture: ComponentFixture<AuPairDashboardComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,NavbarModule,IonicModule, CommonModule,NgxsModule.forRoot([AppState])],
      declarations: [AuPairDashboardComponent],
      providers: [
        {
          provide:HttpClient, useValue:httpMock
        },
        {
          provide:API, useValue:apiMock
        }, 
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuPairDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should,open the report modal when called', async ()=>{
    jest.spyOn(component,"openReportModal");
    component.openReportModal();
    expect(component.openReportModal).toReturn();
  });

  it('should,open the parent rating modal when called', async ()=>{
    jest.spyOn(component,"openModal");
    component.openModal("123");
    expect(component.openModal).toReturn();
  });

  it('should set the auPairId and name on init without resignation and log', async () => {
    store.dispatch(new SetId("123"));
    store.dispatch(new SetName("Test"));
    
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        id: "123",
        rating: [5,5],
        onShift: false,
        employer: "321",
        costIncurred: 0,
        distTraveled: 0,
        payRate: 200,
        bio: "Test",
        experience: "Test",
        currentLong: 0.0,
        currentLat: 0.0,
        terminateDate: "",
      }
    ));

    jest.spyOn(apiMock, 'getUser').mockImplementation(()=>of(
      {
        fname: "Test",
        sname: "Test",
        id: "321",
        number: "082",
        email: "test@test.com",
      }
    ));

    jest.spyOn(apiMock, 'getChildren').mockImplementation(()=>of(
      [
        {
          id: "1",
          fname: "Test",
          sname: "Test",
          dob: "Test",
          allergies: "Test",
          diet: "Test",
          parent: "Test",
          aupair: "Test",
        },
        {
          id: "2",
          fname: "Test",
          sname: "Test",
          dob: "Test",
          allergies: "Test",
          diet: "Test",
          parent: "Test",
          aupair: "Test",
        }
      ]
    ));

    const resSpy = jest.spyOn(component, 'checkResignation');
    const empSpy = jest.spyOn(component, 'getEmployer');
    const apSpy = jest.spyOn(component, 'getAuPairDetails');

    jest.spyOn(apiMock, 'getStartedLog').mockImplementation(()=>of(
      ""
    ));

    await component.ngOnInit();
    expect(component.aupairID).toEqual("123");  
    expect(component.aupairName).toEqual("Test");
    expect(empSpy).toHaveBeenCalled();
    expect(apSpy).toHaveBeenCalled();
    expect(resSpy).not.toHaveBeenCalled();
    expect(component.alreadyLogging).toBeFalsy();
  });

  it('should set the auPairId and name on init with resignation and log', async () => {
    store.dispatch(new SetId("123"));
    store.dispatch(new SetName("Test"));
    
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        id: "123",
        rating: [5,5],
        onShift: false,
        employer: "321",
        costIncurred: 0,
        distTraveled: 0,
        payRate: 200,
        bio: "Test",
        experience: "Test",
        currentLong: 0.0,
        currentLat: 0.0,
        terminateDate: "20/10/2022",
      }
    ));

    jest.spyOn(apiMock, 'getUser').mockImplementation(()=>of(
      {
        fname: "Test",
        sname: "Test",
        id: "321",
        number: "082",
        email: "test@test.com",
      }
    ));

    jest.spyOn(apiMock, 'getChildren').mockImplementation(()=>of(
      [
        {
          id: "1",
          fname: "Test",
          sname: "Test",
          dob: "Test",
          allergies: "Test",
          diet: "Test",
          parent: "Test",
          aupair: "Test",
        },
        {
          id: "2",
          fname: "Test",
          sname: "Test",
          dob: "Test",
          allergies: "Test",
          diet: "Test",
          parent: "Test",
          aupair: "Test",
        }
      ]
    ));

    const resSpy = jest.spyOn(component, 'checkResignation');
    const empSpy = jest.spyOn(component, 'getEmployer');
    const apSpy = jest.spyOn(component, 'getAuPairDetails');

    jest.spyOn(apiMock, 'getStartedLog').mockImplementation(()=>of(
      {}
    ));

    await component.ngOnInit();
    expect(component.aupairID).toEqual("123");  
    expect(component.aupairName).toEqual("Test");
    expect(empSpy).toHaveBeenCalled();
    expect(apSpy).toHaveBeenCalled();
    expect(resSpy).toHaveBeenCalled();
    expect(component.alreadyLogging).toBeTruthy();
  });

  it('should get time end if already logging', async ()=>{
    component.alreadyLogging = true;
    const timeSpy = jest.spyOn(component,"getCurrentTime");
    store.dispatch(new SetId("123"));
    store.dispatch(new SetName("Test"));
    
    jest.spyOn(apiMock, 'getStartedLog').mockImplementation(()=>of(
      "1"
    ));

    jest.spyOn(apiMock, 'addTimeEnd').mockImplementation(()=>of());

    await component.logSwitch();

    expect(timeSpy).toHaveBeenCalled();
    expect(component.alreadyLogging).toBeFalsy();
  });

  it('should get time end if not already logging', async ()=>{
    component.alreadyLogging = false;
    component.aupairID = "123";
    const timeSpy = jest.spyOn(component,"getCurrentTime");
    const daySpy = jest.spyOn(component,"getToday");
  
    jest.spyOn(apiMock, 'addHoursLog').mockImplementation(()=>of(
      {}
    ));

    await component.logSwitch();

    expect(component.hoursLogDetail.user).toEqual("123");
    expect(timeSpy).toHaveBeenCalled();
    expect(daySpy).toHaveBeenCalled();
    expect(component.alreadyLogging).toBeTruthy();
  });

  it('should create a string of todays date', () => {
    jest.spyOn(component, "getToday");

    const str = component.getToday();
    expect(str).toMatch(/^((0[1-9])|([1|2][0-9])|(3[0-1]))\/((0[1-9])|(1[0-2]))\/(\d{4})$/);
  });

  it('should create a string of the current time of the client', () => {
    jest.spyOn(component, "getCurrentTime");
    
    const str = component.getCurrentTime();
    expect(str).toMatch(/^((0[0-9])|(1[0-9])|(2[0-4])):((0[0-9])|([1-6]\d))$/);
  });

  it('should open a toast when openToast is called', async ()=>{
    jest.spyOn(component,"openToast");
    component.openToast("Test");
    expect(component.openToast).toReturn();
  });

  it('should navigate to au-pair-schedule if employerId exists', async ()=>{
    component.employerId = "123";
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');

    await component.checkHasEmployerEmployedSchedule();
    
    expect(spy).toHaveBeenCalledWith(['/au-pair-schedule']);
  });

  it('should toast if employerId does not exist', async ()=>{
    component.employerId = "";
    const spy = jest.spyOn(component, 'openToast');

    await component.checkHasEmployerEmployedSchedule();
    
    expect(spy).toHaveBeenCalledWith('You need to be employed to view your schedule');
  });

  it('should navigate to hire-requests if employerId does not exist', async ()=>{
    component.employerId = "";
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');

    await component.checkHasEmployerEmployedRequests();
    
    expect(spy).toHaveBeenCalledWith(['/hire-requests']);
  });

  it('should toast if employerId exists', async ()=>{
    component.employerId = "123";
    const spy = jest.spyOn(component, 'openToast');

    await component.checkHasEmployerEmployedRequests();
    
    expect(spy).toHaveBeenCalledWith('You are already employed');
  });

  it('should navigate to job-summary-au-pair-view if employerId exists', async ()=>{
    component.employerId = "123";
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');

    await component.checkHasEmployerSummary();
    
    expect(spy).toHaveBeenCalledWith(['/job-summary-au-pair-view']);
  });

  it('should toast if employerId does not exist', async ()=>{
    component.employerId = "";
    const spy = jest.spyOn(component, 'openToast');

    await component.checkHasEmployerSummary();
    
    expect(spy).toHaveBeenCalledWith('You need to be employed to view your job summary');
  });

  it('should present the alert when called', async ()=>{
    jest.spyOn(component,"presentAlert");
    component.presentAlert();
    expect(component.presentAlert).toReturn();
  });

  it('should resign an au pair with fcm token', async ()=>{
    const apSpy = jest.spyOn(component,"getAuPairDetails");
    const updateSpy = jest.spyOn(component,"updateAuPair");
    component.employerEmail = "test@test.com";
    store.dispatch(new SetName("Test"));

    const httpSpy = jest.spyOn(httpMock,"post");

    jest.spyOn(apiMock, 'sendEmail').mockImplementation(()=>of(
      {}
    ));

    jest.spyOn(apiMock, 'getFCMToken').mockImplementation(()=>of(
      "01"
    ));

    await component.resign();

    const requestHeaders = new HttpHeaders().set('Authorization', 'key=AAAAlhtqIdQ:APA91bFlcYmdaqt5D_jodyiVQG8B1mkca2xGh6XKeMuTGtxQ6XKhSY0rdLnc0WrXDsV99grFamp3k0EVHRUJmUG9ULcxf-VSITFgwwaeNvrUq48q0Hn1GLxmZ3GBAYdCBzPFIRdbMxi9')

    expect(component.emailRequest.to).toEqual("test@test.com");
    expect(component.emailRequest.subject).toEqual("Au Pair Resignation");
    expect(component.emailRequest.body).toEqual("Your Au Pair has unfortunatley resigned.\nAccording to our terms and conditions, the au pair will still be employed to you for 2 more weeks." +
                                                "If you are fine with terminating the contract earlier, please speak to your au pair directly.\n\nKind Regards,\nThe Au Pair Team");
    expect(httpSpy).toHaveBeenCalledWith('https://fcm.googleapis.com/fcm/send', 
    {
      "to": "01",
      "notification": {
        "title": "Au Pair Resigned",
        "body": "Test has resigned.",
      }
    }, { headers: requestHeaders })
  });

  it('should terminate an au pair with fcm token', async ()=>{
    const apSpy = jest.spyOn(component,"getAuPairDetails");
    const parSpy = jest.spyOn(component,"getParentDetails");
    const childSpy = jest.spyOn(component,"removeChildrenAuPair");
    const updateApSpy = jest.spyOn(component,"updateAuPair");
    const updateParSpy = jest.spyOn(component,"updateParent");
    component.employerEmail = "test@test.com";
    component.employerName = "Test";
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
    expect(parSpy).toHaveBeenCalled();
    expect(childSpy).toHaveBeenCalled();
    expect(updateApSpy).toHaveBeenCalled();
    expect(updateParSpy).toHaveBeenCalled();

    expect(component.emailRequest.to).toEqual("test@test.com");
    expect(component.emailRequest.subject).toEqual("Au Pair Resignation");
    expect(component.emailRequest.body).toEqual("The 2 weeek period has passed and your au pair has been terminated.\n\nKind Regards,\nThe Au Pair Team");
    expect(httpSpy).toHaveBeenCalledWith('https://fcm.googleapis.com/fcm/send', 
    {
      "to": "01",
      "notification": {
        "title": "Employment Terminated",
        "body": "Employment with Test has been terminated.",
      }
    }, { headers: requestHeaders })
  });

  it('should update child details when called', async ()=>{
    const spy = jest.spyOn(apiMock,"updateChild");
    
    await component.updateChild({
      id: "1",
      fname: "Test",
      sname: "Test",
      dob: "Test",
      allergies: "Test",
      diet: "Test",
      parent: "Test",
      aupair: "Test",
    });

    expect(spy).toHaveBeenCalledWith({
      id: "1",
      fname: "Test",
      sname: "Test",
      dob: "Test",
      allergies: "Test",
      diet: "Test",
      parent: "Test",
      aupair: "Test",
    },);
  });
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
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        employer : "321",
      }
    ));

    await component.ngOnInit();
    expect(component.auPairId).toEqual("123");  
    expect(component.parentID).toEqual("321");
  });

  it('should send the report to the API', async () => {
    store.dispatch(new SetId("123"));
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        employer : "321",
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

describe('ParentRatingModalComponent', () => {
  let component: ParentRatingModalComponent;
  let fixture: ComponentFixture<ParentRatingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentRatingModalComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule, FormsModule,NgxsModule.forRoot([AppState])],
      providers: [
      {
        provide:API, useValue:apiMock
      }, 
      ToastController, 
      ModalController]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentRatingModalComponent);
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

  it('should, close the modal when closeModal is called', async ()=>{
    jest.spyOn(component,"closeModal");
    component.closeModal();
    expect(await component.closeModal).toReturn();
  });

  it('should, when editAuPair() is called with an invalid auPair ID, return an error from the API', async ()=>{
    const expectedValue = undefined;
    jest.spyOn(component,"submitRating");
    expect(await component.submitRating()).toEqual(expectedValue);
  })
});
