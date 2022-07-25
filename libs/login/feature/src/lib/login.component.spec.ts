import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { InputFieldModule } from '@the-au-pair/shared/components/input-field';
import { PasswordFieldModule } from '@the-au-pair/shared/components/password-field';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login.component';
import { API } from '../../../../shared/api/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
 

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  //Valid form
  // const populatedForm = { email: "test@test.com", pass: "TesterPass321!" };

  //Inalid form
  // const invalidEmail = { email: "test@@test.com", pass: "TesterPass321!" };
  // const invalidPass = { email: "test@test.com", pass: "TesterPass"  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule,
        InputFieldModule,
        PasswordFieldModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot()
      ],
      providers:[API, HttpClient, HttpHandler],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
