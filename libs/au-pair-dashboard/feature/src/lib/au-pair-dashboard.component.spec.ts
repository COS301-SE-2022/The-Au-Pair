import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { AuPairDashboardComponent } from './au-pair-dashboard.component';
import { API } from '../../../../shared/api/api.service';
import { AuPairNavbarModule } from '@the-au-pair/shared/components/aupair-navbar';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';

describe('AuPairDashboardComponent', () => {
  let component: AuPairDashboardComponent;
  let fixture: ComponentFixture<AuPairDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,AuPairNavbarModule,IonicModule, CommonModule,NgxsModule.forRoot([AppState])],
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

  it('should, have a redirect to the au-pair schedule', () => {
      const href = fixture.debugElement.query(By.css('#cal')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/au-pair-schedule'); 
  });

  it('should, have a redirect to the au-pair cost', () => {
    const href = fixture.debugElement.query(By.css('#cost')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/au-pair-cost'); 
  });
});
