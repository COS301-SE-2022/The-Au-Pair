import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
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
import { SetId } from '../../../../../libs/shared/ngxs/actions';
import { UserReportModalComponent } from './user-report-modal/user-report-modal.component';
import { ParentRatingModalComponent } from './parent-rating-modal/parent-rating-modal.component';

const apiMock = {
  getAuPair() {
    return of({})
  },
  addReport() {
    return of({})
  },
  getParent() {
    return of()
  },
  editParent() {
    return of()
  }
}

describe('AuPairDashboardComponent', () => {
  let component: AuPairDashboardComponent;
  let fixture: ComponentFixture<AuPairDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,NavbarModule,IonicModule, CommonModule,NgxsModule.forRoot([AppState])],
      declarations: [AuPairDashboardComponent],
      providers: [API]
    }).compileComponents();
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
    expect(await component.openReportModal).toReturn();
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
  let store: Store;

  const validForm = {rating: [5]}

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

    store = TestBed.inject(Store);
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
