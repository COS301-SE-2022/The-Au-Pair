import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuPairCostComponent } from './au-pair-cost.component';
import { API } from '../../../../shared/api/api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';


describe('AuPairCostComponent', () => {
  let component: AuPairCostComponent;
  let fixture: ComponentFixture<AuPairCostComponent>;
  let service: API;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairCostComponent],
      imports: [HttpClientTestingModule, IonicModule,NavbarModule, RouterTestingModule],
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
  })

  it('should populate hours worked per day when populateDaysCost is called', () => {
    const expectedArray = [
      8, 4, 7, 4, 6, 3 ,0
    ];
    
    jest.spyOn(component, "populateDaysCost");
    component.populateDaysCost();

    expect(component.dayHoursWorked).toEqual(expectedArray);
  });
});
