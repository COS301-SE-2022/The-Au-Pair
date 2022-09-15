import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobSummaryModalComponent } from './job-summary-modal.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { API } from '../../../../../shared/api/api.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../../shared/ngxs/state';

describe('JobSummaryModalComponent', () => {
  let component: JobSummaryModalComponent;
  let fixture: ComponentFixture<JobSummaryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobSummaryModalComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule, FormsModule, NgxsModule.forRoot([AppState])],
      providers: [API,ModalController]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSummaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
