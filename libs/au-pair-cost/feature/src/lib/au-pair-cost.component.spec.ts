import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuPairCostComponent } from './au-pair-cost.component';
import { API } from '../../../../shared/api/api.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { ExtraCostsModalComponent } from './extra-costs-modal/extra-costs-modal.component';
import { EditRateModalComponent } from './edit-rate-modal/edit-rate-modal.component';
import { CommonModule } from '@angular/common';
import { SetId, SetType } from '../../../../../libs/shared/ngxs/actions';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

const apiMock = {
  getUser() {
    return of({})
  },
  getParent() {
    return of({})
  },
  getAuPair() {
    return of({})
  },
  addUserCost() {
    return of({})
  },
  editAuPair() {
    return of({})
  },
  getMonthMinutes() {
    return of({})
  },
  getCurrentMonthCostsForJob() {
    return of({})
  },
  getTotalMonthCostsForFuel() {
    return of({})
  },
  getTotalMonthCostsForOvertime() {
    return of({})
  },
  getTotalMonthCostsForOther() {
    return of({})
  },
  getDateMinutes() {
    return of({})
  },
  removeUserCost() {
    return of({})
  },
  getCurrentFuelPrices(){
    return of({})
  },
}

describe('AuPairCostComponent', () => {
  let component: AuPairCostComponent;
  let fixture: ComponentFixture<AuPairCostComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairCostComponent],
      imports: [
        IonicModule, 
        CommonModule,
        HttpClientTestingModule,
        NavbarModule,
        ReactiveFormsModule,
        RouterTestingModule, 
        FormsModule,
        NgxsModule.forRoot([AppState])
      ],
      providers: [
      {
        provide:API, useValue:apiMock
      }, 
      ModalController,
    ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AuPairCostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the extra costs modal when called', async ()=>{
    jest.spyOn(component,"openExtraCostsModal");
    component.openExtraCostsModal();
    expect(await component.openExtraCostsModal).toReturn();
  });

  it('should open the edit rate modal when called', async ()=>{
    jest.spyOn(component,"openEditRateModal");
    component.openEditRateModal();
    expect(await component.openEditRateModal).toReturn();
  });

  it('should set the user type, auPairID and parentID if an au pair uses the page', async () => {
    store.dispatch(new SetId("123"));
    store.dispatch(new SetType(1));
    jest.spyOn(apiMock, 'getParent').mockImplementation(()=>of(
      {
        auPair : "321",
      }
    ));

    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        employer : "123",
        payRate : 200,
        distTraveled : 20,
        costIncurred : 0,
      }
    ));

    jest.spyOn(apiMock, 'getUser').mockImplementation(()=>of(
      {
        fname : "Test",
      }
    ));

    await component.ngOnInit();
    expect(component.parentID).toEqual("123");
    expect(component.aupairID).toEqual("321");
    expect(component.auPairName).toEqual("Test");
    expect(component.hourlyRate).toEqual(200);
  });

  it('should set the user type, auPairID and parentID if a parent uses the page', async () => {
    store.dispatch(new SetId("321"));
    store.dispatch(new SetType(2));
    
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        employer : "123",
        payRate : 200,
        distTraveled : 20,
        costIncurred : 0,
      }
    ));

    jest.spyOn(apiMock, 'getUser').mockImplementation(()=>of(
      {
        fname : "Test",
      }
    ));

    await component.ngOnInit();
    expect(component.aupairID).toEqual("321");
    expect(component.parentID).toEqual("123");
    expect(component.employerName).toEqual("Test");
    expect(component.hourlyRate).toEqual(200);
  });

  it('should set the total hours for an aupair', async () => {
    jest.spyOn(apiMock, 'getMonthMinutes').mockImplementation(()=>of(
      60
    ));

    await component.ngOnInit();
    expect(component.totalHours).toEqual(1);
  });

  it('should set the current monthly costs for an au pair', async () => {
    jest.spyOn(apiMock, 'getCurrentMonthCostsForJob').mockImplementation(()=>of(
      [
        1,
        2,
        3,
      ]
    ));

    await component.ngOnInit();
    expect(component.costList).toEqual([
      1,
      2,
      3,
    ]);
  });

  it('should set the costs for travelcost, activitycost and othercost', async () => {
    jest.spyOn(apiMock, 'getTotalMonthCostsForFuel').mockImplementation(()=>of(
      10
    ));

    jest.spyOn(apiMock, 'getTotalMonthCostsForOvertime').mockImplementation(()=>of(
      20
    ));

    jest.spyOn(apiMock, 'getTotalMonthCostsForOther').mockImplementation(()=>of(
      30
    ));

    await component.setCosts();
    expect(component.travelCost).toEqual(10);
    expect(component.activityCost).toEqual(20);
    expect(component.otherCost).toEqual(30);
  });

  it('should populate degrees of a circle according to costs when calculateTotals is called', () => {
    const expectedOtherDeg = 180;
    const expectedActivityDeg = 288;

    jest.spyOn(component, "calculateTotals");
    component.calculateTotals(50, 30, 100);

    expect(component.otherDeg).toEqual(expectedOtherDeg);
    expect(component.activityDeg).toEqual(expectedActivityDeg);
  });

  it('should populate hours worked per day when populateDaysCost is called', async () => {    
    jest.spyOn(apiMock, 'getDateMinutes').mockImplementation(()=>of(
      120
    ));
    
    await component.populateDaysCost();

    for (let i = 0; i < 7; i++) {
      expect(component.dayHoursWorked[i]).toBe(2);
    }
  });

  it('should delete a cost and update the current months costs', async () => {    
    jest.spyOn(apiMock, 'getCurrentMonthCostsForJob').mockImplementation(()=>of(
      [
        1,
        2,
        3,
      ]
    ));
    
    await component.deleteCost("test");

    expect(component.costList).toEqual([
      1,
      2,
      3,
    ])
  });

  it('should get the days of the current week the client is in', () => {
    jest.spyOn(component, "getStartDateOfWeek");

    for (let i = 0; i < 7; i++) {
      const str = component.getStartDateOfWeek(i);
      expect(str).toMatch(/^((0[1-9])|([1|2][0-9])|(3[0-1]))\/((0[1-9])|(1[0-2]))\/(\d{4})$/);
    }
  });

  it('should create a string of the week range the client is in', () => {
    jest.spyOn(component, "dateRangeToString");
    
    const str = component.dateRangeToString(7);
    expect(str).toMatch(/^((0[1-9])|([1|2][0-9])|(3[0-1]))\s([A-z][a-z]*)\s-\s((0[1-9])|([1|2][0-9])|(3[0-1]))\s([A-z][a-z]*)/);
  });

  it('should, present the alert when called', async ()=>{
    jest.spyOn(component,"presentAlert");
    component.presentAlert("123");
    expect(await component.presentAlert).toReturn();
  });
});

describe('ExtraCostsModalComponent', () => {
  let component: ExtraCostsModalComponent;
  let fixture: ComponentFixture<ExtraCostsModalComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtraCostsModalComponent],
      imports: [
        IonicModule, 
        CommonModule,
        HttpClientTestingModule,
        NavbarModule,
        ReactiveFormsModule,
        RouterTestingModule, 
        FormsModule,
        NgxsModule.forRoot([AppState])
      ],
      providers: [
      {
        provide:API, useValue:apiMock
      }, 
      ModalController, 
      ToastController,
      FormBuilder
    ]
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraCostsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should set the auPairId to userID on init', async () => {
    store.dispatch(new SetId("123"));
    store.dispatch(new SetType(2));

    await component.ngOnInit();
    expect(component.auPairId).toEqual("123");
  });

  it('should set the parentId to userID', async () => {
    store.dispatch(new SetId("123"));
    store.dispatch(new SetType(1));
    jest.spyOn(apiMock, 'getParent').mockImplementation(()=>of(
      {
        auPair : "321",
      }
    ));

    await component.ngOnInit();
    expect(component.auPairId).toEqual("321");
  });

  it('should get the au pairs details', async () => {
    store.dispatch(new SetId("123"));
    store.dispatch(new SetType(2));
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        employer : "213",
        payRate : "200"
      }
    ));

    await component.ngOnInit();
    expect(component.auPairId).toEqual("123");
    expect(component.parentID).toEqual("213");
    expect(component.payRate).toEqual("200");
  });

  it('should call getCurrentFuelPrice', async () => {
    const spy = jest.spyOn(component, 'getCurrentFuelPrice');

    await component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set the fuel prices', async () => {
    jest.spyOn(apiMock, 'getCurrentFuelPrices').mockImplementation(()=>of(
      {
        diesel : [
          {
            value: "100"
          }
        ],
        petrol : [
          {
            value: "200"
          },
          {
            value: "300"
          },
        ]
      }
    ));

    await component.getCurrentFuelPrice();

    const fuelPrices = {
      "diesel": 1,
      "petrol-95": 2,
      "petrol-93": 3, 
    };
    expect(component.fuelPrices).toEqual(fuelPrices);
  });

  it('should set amount editable to false', async () => {
    component.costsForm.controls['type'].setValue('Overtime');
    expect(component.amountEditable).toBeFalsy();

    component.costsForm.controls['type'].setValue('Fuel');
    expect(component.amountEditable).toBeFalsy();
  });

  it('should set amount field based off fuel prices', async () => {
    jest.spyOn(apiMock, 'getCurrentFuelPrices').mockImplementation(()=>of(
      {
        diesel : [
          {
            value: "100"
          }
        ],
        petrol : [
          {
            value: "200"
          },
          {
            value: "300"
          },
        ]
      }
    ));

    await component.getCurrentFuelPrice();

    component.costsForm.controls['type'].setValue('Fuel');
    component.costsForm.controls['distance'].setValue('20');
    component.costsForm.controls['kml'].setValue('12');
    component.costsForm.controls['fuelType'].setValue('95-Unleaded');
    expect(component.costsForm.controls['amount'].value).toEqual((10/3).toFixed(2));

    component.costsForm.controls['type'].setValue('Fuel');
    component.costsForm.controls['distance'].setValue('20');
    component.costsForm.controls['kml'].setValue('12');
    component.costsForm.controls['fuelType'].setValue('93-Unleaded');
    expect(component.costsForm.controls['amount'].value).toEqual((5).toFixed(2));

    component.costsForm.controls['type'].setValue('Fuel');
    component.costsForm.controls['distance'].setValue('20');
    component.costsForm.controls['kml'].setValue('12');
    component.costsForm.controls['fuelType'].setValue('Diesel');
    expect(component.costsForm.controls['amount'].value).toEqual((5/3).toFixed(2));
  });

  it('should set amount field based off overtime', async () => {
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        employer : "213",
        payRate : "200"
      }
    ));

    await component.ngOnInit();

    component.costsForm.controls['type'].setValue('Overtime');
    component.costsForm.controls['hours'].setValue('2');

    const num = 400;

    expect(component.costsForm.controls['amount'].value).toEqual(num);
  });

  it('should pad a number with 0 if not 2 digits', async () => {
    const test1 = component.padDateTo2Digits(1);
    const test2 = component.padDateTo2Digits(10);

    expect(test1).toEqual("01");
    expect(test2).toEqual("10");
  });

  it('should send cost data to the API', async () => {
    const spy = jest.spyOn(apiMock, 'addUserCost');

    component.sendCostData("test", "test", 0, 0);

    expect(spy).toHaveBeenCalled();
  });

  it('should give an error for description', async () => {
    const spy = jest.spyOn(component, 'sendCostData');

    component.costsForm.controls['type'].setValue('Other');
    component.costsForm.controls['desc'].setValue('');

    component.addCost();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should give an error for fuel', async () => {
    const spy = jest.spyOn(component, 'sendCostData');

    component.costsForm.controls['type'].setValue('Fuel');
    component.costsForm.controls['distance'].setValue('');

    component.addCost();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should give an error for kml', async () => {
    const spy = jest.spyOn(component, 'sendCostData');

    component.costsForm.controls['type'].setValue('Fuel');
    component.costsForm.controls['distance'].setValue('20');
    component.costsForm.controls['kml'].setValue('test');

    component.addCost();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should give an error for overtime', async () => {
    const spy = jest.spyOn(component, 'sendCostData');

    component.costsForm.controls['type'].setValue('Overtime');
    component.costsForm.controls['hours'].setValue('test');

    component.addCost();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should send cost data for fuel', async () => {
    const spy = jest.spyOn(component, 'sendCostData');
    jest.spyOn(apiMock, 'getCurrentFuelPrices').mockImplementation(()=>of(
      {
        diesel : [
          {
            value: "100"
          }
        ],
        petrol : [
          {
            value: "200"
          },
          {
            value: "300"
          },
        ]
      }
    ));

    await component.getCurrentFuelPrice();

    component.costsForm.controls['type'].setValue('Fuel');
    component.costsForm.controls['distance'].setValue('20');
    component.costsForm.controls['kml'].setValue('12');
    component.costsForm.controls['fuelType'].setValue('95-Unleaded');
    component.addCost();
    expect(spy).toHaveBeenCalledWith('Fuel', "Travelled 20kms with fuel costing R2 per litre", 20, parseFloat((10/3).toFixed(2)));

    component.costsForm.controls['type'].setValue('Fuel');
    component.costsForm.controls['distance'].setValue('20');
    component.costsForm.controls['kml'].setValue('12');
    component.costsForm.controls['fuelType'].setValue('93-Unleaded');
    component.addCost();
    expect(spy).toHaveBeenCalledWith('Fuel', "Travelled 20kms with fuel costing R3 per litre", 20, parseFloat((5).toFixed(2)));

    component.costsForm.controls['type'].setValue('Fuel');
    component.costsForm.controls['distance'].setValue('20');
    component.costsForm.controls['kml'].setValue('12');
    component.costsForm.controls['fuelType'].setValue('Diesel');
    component.addCost();
    expect(spy).toHaveBeenCalledWith('Fuel', "Travelled 20kms with fuel costing R1 per litre", 20, parseFloat((5/3).toFixed(2)));
  });

  it('should send cost data for overtime', async () => {
    const spy = jest.spyOn(component, 'sendCostData');
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        employer : "213",
        payRate : "200"
      }
    ));

    await component.ngOnInit();

    component.costsForm.controls['type'].setValue('Overtime');
    component.costsForm.controls['desc'].setValue('test');
    component.costsForm.controls['hours'].setValue('2');

    component.addCost()

    expect(spy).toHaveBeenCalledWith('Overtime', "test", 2, 400);
  });

  it('should send cost data for other', async () => {
    const spy = jest.spyOn(component, 'sendCostData');

    component.costsForm.controls['type'].setValue('Other');
    component.costsForm.controls['desc'].setValue('test');
    component.costsForm.controls['amount'].setValue('20');

    component.addCost()

    expect(spy).toHaveBeenCalledWith('Other', "test", 0, 20);
  });

});

describe('EditRateModalComponent', () => {
  let component: EditRateModalComponent;
  let fixture: ComponentFixture<EditRateModalComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRateModalComponent],
      imports: [
        IonicModule, 
        CommonModule,
        HttpClientTestingModule,
        NavbarModule,
        ReactiveFormsModule,
        RouterTestingModule, 
        FormsModule,
        NgxsModule.forRoot([AppState])
      ],
      providers: [{
        provide:API, useValue:apiMock
      }, 
      ModalController, 
      ToastController,
      FormBuilder
    ]
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should set the auPairId to userID on init', async () => {
    store.dispatch(new SetId("123"));
    store.dispatch(new SetType(2));

    await component.ngOnInit();
    expect(component.auPairId).toEqual("123");
  });

  it('should get the au pairs details', async () => {
    store.dispatch(new SetId("123"));
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        id : "123",
        rating : [5,5],
        onShift : false,
        employer : "213",
        costIncurred : 0,
        distTraveled: 0,        
        payRate : "200",
        bio : "",
        experience : "",
        currentLong : 0.0,
        currentLat : 0.0,
        terminateDate : "",
        alreadyOutOfBounds: false,
      }
    ));

    await component.ngOnInit();
    expect(component.AuPair).toEqual({
      id : "123",
      rating : [5,5],
      onShift : false,
      employer : "213",
      costIncurred : 0,
      distTraveled: 0,        
      payRate : "200",
      bio : "",
      experience : "",
      currentLong : 0.0,
      currentLat : 0.0,
      terminateDate : "",
      alreadyOutOfBounds: false,
    });
  });

  it('should give an error when trying to update the au pairs pay rate', async () => {
    const spy = jest.spyOn(apiMock, 'editAuPair');
    component.payRateInput.setValue('Test');
    
    await component.updateRate();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update the rate of an au pair', async () => {
    const spy = jest.spyOn(apiMock, 'editAuPair');
    component.payRateInput.setValue('200');
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        id : "123",
        rating : [5,5],
        onShift : false,
        employer : "213",
        costIncurred : 0,
        distTraveled: 0,
        payRate : "200",
        bio : "",
        experience : "",
        currentLong : 0.0,
        currentLat : 0.0,
        terminateDate : "",
        alreadyOutOfBounds: false,
      }
    ));

    await component.ngOnInit();
    await component.updateRate();
    expect(spy).toHaveBeenCalledWith({
      id : "123",
      rating : [5,5],
      onShift : false,
      employer : "213",
      costIncurred : 0,
      distTraveled: 0,        
      payRate : "200",
      bio : "",
      experience : "",
      currentLong : 0.0,
      currentLat : 0.0,
      terminateDate : "",
      alreadyOutOfBounds: false,
    });

    expect(component.sending).toBeFalsy();
  });
});

