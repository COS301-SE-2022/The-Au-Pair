import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReportsComponent } from './admin-reports.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { API } from '../../../../shared/api/api.service';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { of } from 'rxjs';

const testReportedUser = {
  reportedUserId: "123",
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

const apiMock = {
  getAllReports() {
    return of({})
  },
  getUser() {
    return of({})
  },
  deleteReport() {
    return of({})
  },
  editUser() {
    return of({})
  },
  sendEmail() {
    return of({})
  },
  getAuPairEmployer() {
    return of({})
  }
}

describe('AdminReportsComponent', () => {
  let component: AdminReportsComponent;
  let fixture: ComponentFixture<AdminReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminReportsComponent],
      imports: [IonicModule,HttpClientTestingModule,RouterTestingModule,NavbarModule,NgxsModule.forRoot([AppState])],
      providers: [
        {
          provide:API, useValue:apiMock
        },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getReports on init', () => {
    const rep = jest.spyOn(component, 'getReports');
    component.ngOnInit();
    expect(rep).toHaveBeenCalled();
  });

  it('should populate the reports array when called', async ()=>{
    await jest.spyOn(apiMock, 'getAllReports').mockImplementation(()=>of(
      [
        {
          reportedUserId : "123"
        }
      ]
    ));

    jest.spyOn(apiMock, 'getUser').mockImplementation(()=>of(
      {
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
    ));

    await component.getReports();

    expect(component.reports[0].reportedUserId).toEqual(testReportedUser.reportedUserId);
    expect(component.reports[0].fname).toEqual(testReportedUser.fname);
    expect(component.reports[0].warnings).toEqual(testReportedUser.warnings);
    expect(component.reports[0].banned).toEqual(testReportedUser.banned);
  });

  it('should delete a report when dismissed', async ()=>{
    await jest.spyOn(apiMock, 'getAllReports').mockImplementation(()=>of(
      [
        {
          reportedUserId : "123"
        }
      ]
    ));

    jest.spyOn(apiMock, 'getUser').mockImplementation(()=>of(
      {
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
    ));

    await component.getReports();
    
    const del = jest.spyOn(apiMock, 'deleteReport');

    await del.mockImplementation(()=>of(
      true
    ));

    await component.dismiss({id : "123"});

    expect(del).toHaveBeenCalledWith("123");
  });

  it('should give a user a warning then delete the report', async ()=>{
    const edit = jest.spyOn(apiMock, 'editUser');
    
    const del = jest.spyOn(apiMock, 'deleteReport');

    await edit.mockImplementation(()=>of(
      true
    ));

    await del.mockImplementation(()=>of(
      true
    ));

    await component.warn({
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
    });

    expect(edit).toHaveBeenCalled();
    expect(del).toHaveBeenCalledWith("123");
  });

  it('should ban a user after receiving another warning', async ()=>{
    const edit = jest.spyOn(apiMock, 'editUser');
    
    const del = jest.spyOn(apiMock, 'deleteReport');

    await edit.mockImplementation(()=>of(
      true
    ));

    await del.mockImplementation(()=>of(
      true
    ));

    await component.warn({
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
      warnings : 3,
      banned : "",
      fcmToken : ""
    });

    expect(component.userDetails.banned).toEqual("Due to receiving more than 3 warnings");
    expect(edit).toHaveBeenCalled();
    expect(del).toHaveBeenCalledWith("123");
  });

  it('should ban a user', async ()=>{
    const edit = jest.spyOn(apiMock, 'editUser');
    
    const del = jest.spyOn(apiMock, 'deleteReport');

    await edit.mockImplementation(()=>of(
      true
    ));

    await del.mockImplementation(()=>of(
      true
    ));

    await component.ban({
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
      warnings : 3,
      banned : "",
      fcmToken : ""
    });

    expect(component.userDetails.banned).toEqual("Due to violation of community guidelines");
    expect(edit).toHaveBeenCalled();
    expect(del).toHaveBeenCalledWith("123");
  });
});
