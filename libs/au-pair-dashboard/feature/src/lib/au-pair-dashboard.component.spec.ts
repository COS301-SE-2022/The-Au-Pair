import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { AuPairDashboardComponent } from './au-pair-dashboard.component';
import { API } from '../../../../shared/api/api.service';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

describe('AuPairDashboardComponent', () => {
  let component: AuPairDashboardComponent;
  let fixture: ComponentFixture<AuPairDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,NavbarModule,IonicModule, CommonModule],
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

  it('should change the value of alreadyLogging to the opposite of what it was', () => {
    jest.spyOn(component, "logSwitch");

    component.logSwitch();
    expect(component.alreadyLogging).not.toEqual(component.alreadyLogging);
  });

  it('should create a string of todays date', () => {
    jest.spyOn(component, "getToday");

    const str = component.getToday();
    expect(str).toMatch(/^((0[1-9])|([1|2][0-9])|(3[0-1]))\/((0[1-9])|(1[0-2]))\/(\d{4})$/);
  });

  it('should create a string of the current time of the client', () => {
    jest.spyOn(component, "getCurrentTime");
    
    const str = component.getCurrentTime();
    expect(str).toMatch(/^((0[1-9])|(1[0-9])|(2[0-4])):((0[1-9])|([1-6]\d))$/);
  });
});
