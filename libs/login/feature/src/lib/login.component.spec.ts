import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { Router } from '@angular/router';
import { InputFieldModule } from '@the-au-pair/shared/components/input-field';
import { PasswordFieldModule } from '@the-au-pair/shared/components/password-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { LoginComponent } from './login.component';
import { API } from '../../../../shared/api/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { AdminConsoleComponent } from 'libs/admin-console/feature/src/lib/admin-console.component';
import { ParentDashboardComponent } from 'libs/parent-dashboard/feature/src/lib/parent-dashboard';
import { AuPairDashboardComponent } from 'libs/au-pair-dashboard/feature/src/lib/au-pair-dashboard.component';

const apiMock = {
  login(email: String, password: String) {
    return of({})
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  
  //Valid form
  const populatedForm = { email: "test@test.com", pass: "TesterPass321!" };

  //Inalid form
  const invalidEmail = { email: "", pass: "TesterPass321!" };
  const invalidPass = { email: "test@test.com", pass: ""  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule,
        InputFieldModule,
        PasswordFieldModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
            {path: 'admin-console', component: AdminConsoleComponent},
            {path: 'parent-dashboard', component: ParentDashboardComponent},
            {path: 'au-pair-dashboard', component: AuPairDashboardComponent}
          ]),
        HttpClientTestingModule,
        FormsModule,
        NgxsModule.forRoot([AppState])
      ],
      providers:[
        {
          provide:API, useValue:apiMock
        }, 
        ToastController, 
        FormBuilder
      ],
      declarations: [LoginComponent],
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      router = TestBed.get(Router);
      // fixture.detectChanges();
    });

  });

  function inputLogin(email : string, pass : string) {
    component.loginDetailsForm.controls['email'].setValue(email);
    component.loginDetailsForm.controls['pass'].setValue(pass);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should populate fields on form input', () => {
    inputLogin(populatedForm.email, populatedForm.pass);
    expect(component.loginDetailsForm.value).toEqual(populatedForm);
  });

  it('should make the form invalid on inputs', () => {
    // Email invalid
    inputLogin(invalidEmail.email, invalidEmail.pass);
    expect(component.formValid).toBeFalsy();

    // password invalid
    inputLogin(invalidPass.email, invalidPass.pass);
    expect(component.formValid).toBeFalsy();
  });

  it('should set an error state if the fields are empty', async () => {
    // Email invalid
    inputLogin(invalidEmail.email, "");
    await component.loginUser();

    expect(component.errState).toBeTruthy();
    expect(component.errStatement).toEqual("Fields cannot be empty");

    // Password invalid
    inputLogin("", invalidPass.pass);
    await component.loginUser();

    expect(component.errState).toBeTruthy();
    expect(component.errStatement).toEqual("Fields cannot be empty");
  });

  it('should login an admin', async () => {
    inputLogin(populatedForm.email, populatedForm.pass);
    const navigateSpy = jest.spyOn(router, 'navigate');
    
    jest.spyOn(apiMock, 'login').mockImplementation(()=>of(
      {
        id : "0101015077086",
        name : "Test",
        type : 0,
        banned : ""
      }
    ));

    await component.loginUser();
    expect(component.errState).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin-console']);
  });

  it('should login a parent', async () => {
    inputLogin(populatedForm.email, populatedForm.pass);
    const navigateSpy = jest.spyOn(router, 'navigate');
    
    jest.spyOn(apiMock, 'login').mockImplementation(()=>of(
      {
        id : "0101015077086",
        name : "Test",
        type : 1,
        banned : ""
      }
    ));

    await component.loginUser();
    expect(component.errState).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['/parent-dashboard']);
  });

  it('should login an au pair', async () => {
    inputLogin(populatedForm.email, populatedForm.pass);
    const navigateSpy = jest.spyOn(router, 'navigate');
    
    jest.spyOn(apiMock, 'login').mockImplementation(()=>of(
      {
        id : "0101015077086",
        name : "Test",
        type : 2,
        banned : ""
      }
    ));

    await component.loginUser();
    expect(component.errState).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['/au-pair-dashboard']);
  });

  it('should show a toast if account is banned', async () => {
    inputLogin(populatedForm.email, populatedForm.pass);

    const toastSpy = jest.spyOn(component, 'openToast');
    
    jest.spyOn(apiMock, 'login').mockImplementation(()=>of(
      {
        "id" : "0101015077086",
        "name" : "Test",
        "type" : 2,
        "banned" : "Due to community guideline violations"
      }
    ));

    await component.loginUser();
    expect(toastSpy).toHaveBeenCalledWith("Your account has been banned");
  });

  it('should not login if the email or password is incorrect', async () => {
    inputLogin(populatedForm.email, populatedForm.pass);
    
    jest.spyOn(apiMock, 'login').mockImplementation(()=>of(
      {
        id : "",
        name : "",
        type : 2,
        banned : ""
      }
      ));
      
      await component.loginUser();
      expect(component.errState).toBeTruthy();
      expect(component.errStatement).toEqual("Incorrect email or password");
  });

  it('should show a toast if account is pending approval', async () => {
    inputLogin(populatedForm.email, populatedForm.pass);
    
    const toastSpy = jest.spyOn(component, 'openToast');
    jest.spyOn(apiMock, 'login').mockImplementation(()=>of(
    {
      id : "pending",
      name : "Test",
      type : 2,
      banned : ""
    }
    ));
      
      await component.loginUser();
    expect(toastSpy).toHaveBeenCalledWith("Your account is pending approval");
  });
});
