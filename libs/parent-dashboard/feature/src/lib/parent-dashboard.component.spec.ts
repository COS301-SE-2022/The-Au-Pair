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
import { SetId } from '../../../../../libs/shared/ngxs/actions';
import { UserReportModalComponent } from './user-report-modal/user-report-modal.component';
import { AuPairRatingModalComponent } from './au-pair-rating-modal/au-pair-rating-modal.component';
import { Router } from '@angular/router';
import { auPair } from '../../../../../libs/shared/interfaces/interfaces';

const apiMock = {
  getParent() {
    return of({})
  },
  addReport() {
    return of({})
  },
  getAuPair() {
    return of()
  },
  editAuPair() {
    return of()
  },
  getUser () {
    return of({})
  },
  sendEmail() {
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
    }).compileComponents();
  });

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
       providers:[API, ModalController]
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
    expect(await component.openModal).toReturn();
  });

  it('should,open the report modal when called', async ()=>{
    jest.spyOn(component,"openReportModal");
    component.openReportModal();
    expect(await component.openReportModal).toReturn();
  });

  it('should, open the toast when called', async ()=>{
    jest.spyOn(component,"openToast");
    component.openToast("Test");
    expect(await component.openToast).toReturn();
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

  it('should, open the toast if there is no schedule', async () => {
    const toastSpy = jest.spyOn(component, 'openToast');
    await component.checkHasChildrenSchedule();
    expect(toastSpy).toHaveBeenCalledWith("You have no childrens' schedules to view");
  });

  it('should, open the toast if there is no schedule', async () => {
    const toastSpy = jest.spyOn(component, 'openToast');
    await component.checkHasChildrenSchedule();
    expect(toastSpy).toHaveBeenCalledWith("You have no childrens' schedules to view");
  });

  it('should, open the toast if there is no au pair costs', async () => {
    const toastSpy = jest.spyOn(component, 'openToast');
    await component.checkHasEmployer();
    expect(toastSpy).toHaveBeenCalledWith("You do not have an Au Pair Employed");
  });

  it('should, open the toast if there is no au pair to track', async () => {
    const toastSpy = jest.spyOn(component, 'openToast');
    await component.checkHasEmployerTrack();
    expect(toastSpy).toHaveBeenCalledWith("You do not have an Au Pair Employed");
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
