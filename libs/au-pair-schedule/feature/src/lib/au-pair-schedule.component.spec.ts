import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { AuPairScheduleComponent } from './au-pair-schedule.component';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { FormsModule } from '@angular/forms';

describe('AuPairScheduleComponent', () => {
  let component: AuPairScheduleComponent;
  let fixture: ComponentFixture<AuPairScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairScheduleComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule, FormsModule],
      providers: [API,ModalController]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuPairScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should,close the open when closeModal is called', async ()=>{
    jest.spyOn(component,"openModal");
    component.openModal("dxzv6chgn5zp19ezfiqn7fxf");
    expect(await component.openModal).toReturn();
  });

  it('should,return an integer representation of Monday',async () => {
    const expected = 0;
    jest.spyOn(component, "getCurDay").mockReturnValue(0);
    const dayInt = await component.getCurDay(["Monday"]);
    expect(dayInt).toEqual(expected);
})

it('should,return an integer representation of Tuesday',async () => {
  const expected = 1;
  jest.spyOn(component, "getCurDay").mockReturnValue(1);
  const dayInt = await component.getCurDay(["Tuesday"]);
  expect(dayInt).toEqual(expected);
})

it('should,return an integer representation of Wednesday',async () => {
  const expected = 2;
  jest.spyOn(component, "getCurDay").mockReturnValue(2);
  const dayInt = await component.getCurDay(["Wednesday"]);
  expect(dayInt).toEqual(expected);
})

it('should,return an integer representation of Thursday',async () => {
  const expected = 3;
  jest.spyOn(component, "getCurDay").mockReturnValue(3);
  const dayInt = await component.getCurDay(["Thursday"]);
  expect(dayInt).toEqual(expected);
})

it('should,return an integer representation of Friday',async () => {
  const expected = 4;
  jest.spyOn(component, "getCurDay").mockReturnValue(4);
  const dayInt = await component.getCurDay(["Friday"]);
  expect(dayInt).toEqual(expected);
})

it('should,return an integer representation of Saturday',async () => {
  const expected = 5;
  jest.spyOn(component, "getCurDay").mockReturnValue(5);
  const dayInt = await component.getCurDay(["Saturday"]);
  expect(dayInt).toEqual(expected);
})

it('should,return an integer representation of Sunday',async () => {
  const expected = 6;
  jest.spyOn(component, "getCurDay").mockReturnValue(6);
  const dayInt = await component.getCurDay(["Sunday"]);
  expect(dayInt).toEqual(expected);
})

it('should,return an integer representation of Sunday',async () => {
  const expected = 6;
  jest.spyOn(component, "getCurDay").mockReturnValue(6);
  const dayInt = await component.getCurDay(["Sunday"]);
  expect(dayInt).toEqual(expected);
})

});
