import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParentDashboardComponent } from './parent-dashboard';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { API } from '../../../../shared/api/api.service';

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
        RouterTestingModule
       ],
       providers:[API]
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
});
