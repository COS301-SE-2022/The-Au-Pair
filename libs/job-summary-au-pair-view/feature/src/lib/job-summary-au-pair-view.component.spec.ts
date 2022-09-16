import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { CommonModule } from '@angular/common';
import { RouterTestingModule} from '@angular/router/testing';
import { API } from '../../../../shared/api/api.service';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { JobSummaryAuPairViewComponent } from './job-summary-au-pair-view.component';

describe('JobSummaryAuPairViewComponent', () => {
  let component: JobSummaryAuPairViewComponent;
  let fixture: ComponentFixture<JobSummaryAuPairViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobSummaryAuPairViewComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule, FormsModule, NgxsModule.forRoot([AppState])],
      providers: [API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSummaryAuPairViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
