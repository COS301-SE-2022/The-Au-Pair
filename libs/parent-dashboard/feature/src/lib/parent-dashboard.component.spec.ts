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

const apiMock = {
  getParent() {
    return of({})
  },
  addReport() {
    return of({})
  }
}

describe('ParentProfileComponent', () => {
  let component: ParentDashboardComponent;
  let fixture: ComponentFixture<ParentDashboardComponent>;

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

  it('should, have a redirect to the children dashboard page', () => {
    const href = fixture.debugElement.query(By.css('#childDash')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/children-dashboard'); 
  });
});

describe('AuPairRatingModalComponent', () => {
  let component: AuPairRatingModalComponent;
  let fixture: ComponentFixture<AuPairRatingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairRatingModalComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule, FormsModule,NgxsModule.forRoot([AppState])],
      providers: [API,ModalController]
    }).compileComponents();
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
    expect(toast).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
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
});