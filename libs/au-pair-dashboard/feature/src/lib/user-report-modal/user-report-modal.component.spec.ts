import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { API } from '../../../../../shared/api/api.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { UserReportModalComponent } from './user-report-modal.component';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../../shared/ngxs/state';

describe('AuPairRatingModalComponent', () => {
  let component: UserReportModalComponent;
  let fixture: ComponentFixture<UserReportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserReportModalComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule, FormsModule,NgxsModule.forRoot([AppState])],
      providers: [API,ModalController]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
