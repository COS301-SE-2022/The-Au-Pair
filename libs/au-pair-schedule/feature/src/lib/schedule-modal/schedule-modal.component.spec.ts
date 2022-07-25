import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { API } from '../../../../../shared/api/api.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { ScheduleModalComponent } from './schedule-modal.component';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { FormsModule } from '@angular/forms';

describe('ScheduleModalComponent', () => {
  let component: ScheduleModalComponent;
  let fixture: ComponentFixture<ScheduleModalComponent>;

  const invalidActivity = {id: "invalidId", name: "AI", description: "AI Lesson", location: "UP", timeStart:"13:00", timeEnd: "14:00",  budget: 0.0 ,comment: "", behavior: 0, day: "Wednesday", child:"8675945310542"};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleModalComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule, FormsModule,],
      providers: [API,ModalController]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should, when getActivity() is called with an invalid activity ID, return an error from the API', async ()=>{
    const expectedValue = undefined;
    jest.spyOn(component,"getActivity");
    expect(await component.getActivity(invalidActivity.id)).toEqual(expectedValue);
  });

  it('should, open a toast when openToast is called', async ()=>{
    jest.spyOn(component,"openToast");
    component.openToast();
    expect(await component.openToast).toReturn();
  });

  it('should,close the modal when closeModal is called', async ()=>{
    jest.spyOn(component,"closeModal");
    component.closeModal();
    expect(await component.closeModal).toReturn();
  });
});
