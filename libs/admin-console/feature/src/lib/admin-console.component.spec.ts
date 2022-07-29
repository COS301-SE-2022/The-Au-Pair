import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { AdminConsoleComponent } from './admin-console.component';
import { API } from '../../../../shared/api/api.service';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';

describe('AdminConsoleComponent', () => {
  let component: AdminConsoleComponent;
  let fixture: ComponentFixture<AdminConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminConsoleComponent],
      imports: [IonicModule,HttpClientTestingModule,RouterTestingModule,NavbarModule,NgxsModule.forRoot([AppState])],
      providers: [API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
