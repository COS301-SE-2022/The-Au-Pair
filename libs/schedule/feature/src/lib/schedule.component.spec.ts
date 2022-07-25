import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ScheduleComponent } from "./schedule";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { API } from '../../../../shared/api/api.service';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { AppState } from 'libs/shared/ngxs/state';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule,NgxsModule.forRoot([AppState])],
      providers:[API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

});
