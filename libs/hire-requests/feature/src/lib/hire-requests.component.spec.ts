import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HireRequestsComponent } from './hire-requests.component';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';

describe('HireRequestsComponent', () => {
  let component: HireRequestsComponent;
  let fixture: ComponentFixture<HireRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HireRequestsComponent],
      imports: [FormsModule,
        IonicModule,
        NavbarModule,
        NgxsModule.forRoot([AppState])
        ],
        providers:[API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
  