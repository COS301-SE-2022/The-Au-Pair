import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuPairCostComponent } from './au-pair-cost.component';
import { API } from '../../../../shared/api/api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';


describe('AuPairCostComponent', () => {
  let component: AuPairCostComponent;
  let fixture: ComponentFixture<AuPairCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairCostComponent],
      imports: [HttpClientTestingModule, IonicModule,NavbarModule, RouterTestingModule,NgxsModule.forRoot([AppState])],
      providers: [API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuPairCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate degrees of a circle according to costs when calculatePie is called', () => {
    const expectedOtherDeg = 180;
    const expectedActivityDeg = 288;

    jest.spyOn(component, "calculatePie");
    component.calculatePie(50, 30, 100);

    expect(component.otherDeg).toEqual(expectedOtherDeg);
    expect(component.activityDeg).toEqual(expectedActivityDeg);
  });

  it('should populate hours worked per day when populateDaysCost is called', () => {    
    jest.spyOn(component, "populateDaysCost");
    component.populateDaysCost();

    for (let i = 0; i < 7; i++) {
      expect(component.dayHoursWorked[i]).toBeGreaterThanOrEqual(0);
      expect(component.dayHoursWorked[i]).toBeLessThanOrEqual(24);
    }
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
});
