import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { AdminConsoleComponent } from './admin-console.component';
import { API } from '../../../../shared/api/api.service';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { of } from 'rxjs';

const apiMock = {
  getApplicants() {
    return of({})
  },
  getAuPair() {
    return of({})
  },
  resolveApplication() {
    return of({})
  }
}

const mockUser = {
  id : "123",
  fname : "TestName",
  sname : "TestSurname",
  email : "TestEmail",
  address : "TestAddress",
  registered : true,
  type : 1,
  password : "TestPassword",
  number : "TestNumber",
  salt : "TestSalt",
  latitude : 0,
  longitude : 0,
  suburb : "TestSuburb",
  gender : "Female",
  birth : "TestBirth",
  warnings : 0,
  banned : "",
  fcmToken : "",
  experience : "TestExperience",
  bio : "TestBio"
}

describe('AdminConsoleComponent', () => {
  let component: AdminConsoleComponent;
  let fixture: ComponentFixture<AdminConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminConsoleComponent],
      imports: [IonicModule,HttpClientTestingModule,RouterTestingModule,NavbarModule,NgxsModule.forRoot([AppState])],
      providers: [
      {
        provide:API, useValue:apiMock
      },
    ]
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

  it('should get all the signUp requests', async ()=>{
    await jest.spyOn(apiMock, 'getApplicants').mockImplementation(()=>of(
      [
        {
          id : "123",
          fname : "TestName",
          sname : "TestSurname",
          email : "TestEmail",
          address : "TestAddress",
          registered : true,
          type : 1,
          password : "TestPassword",
          number : "TestNumber",
          salt : "TestSalt",
          latitude : 0,
          longitude : 0,
          suburb : "TestSuburb",
          gender : "Female",
          birth : "TestBirth",
          warnings : 0,
          banned : "",
          fcmToken : ""
        }
      ]
    ));

    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        experience : "TestExperience",
        bio : "TestBio"
      }
    ));

    await component.getSignUpRequests();

    expect(component.auPairs[0].id).toEqual(mockUser.id);
    expect(component.auPairs[0].fname).toEqual(mockUser.fname);
    expect(component.auPairs[0].bio).toEqual(mockUser.bio);
    expect(component.auPairs[0].experience).toEqual(mockUser.experience);
  });

  it('should resolve the user application', async ()=>{
    const resApplSpy = jest.spyOn(apiMock, 'resolveApplication')
    
    await resApplSpy.mockImplementation(()=>of(
      true
    ));

    const resSpy = jest.spyOn(component, "resolve");

    await component.resolve("123", true);

    expect(resApplSpy).toHaveBeenCalledWith("123", true);
    expect(resSpy).toReturn();
  });
});
