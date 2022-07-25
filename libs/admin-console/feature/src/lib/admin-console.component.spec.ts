import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { AdminConsoleComponent } from './admin-console.component';
import { API } from '../../../../shared/api/api.service';
import { AdminNavbarModule } from '@the-au-pair/shared/components/admin-navbar';
import { NgxsModule } from '@ngxs/store';

describe('AdminConsoleComponent', () => {
  let component: AdminConsoleComponent;
  let fixture: ComponentFixture<AdminConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminConsoleComponent],
      imports: [IonicModule,HttpClientTestingModule,RouterTestingModule,AdminNavbarModule,NgxsModule.forRoot()],
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
