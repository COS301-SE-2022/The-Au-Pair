import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { AuPairDashboardComponent } from './au-pair-dashboard.component';
import { API } from 'libs/shared/api/api.service';
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
});
