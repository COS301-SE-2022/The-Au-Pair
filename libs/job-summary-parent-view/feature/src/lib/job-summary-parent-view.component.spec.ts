import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { API } from '../../../../shared/api/api.service';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { JobSummaryParentViewComponent } from './job-summary-parent-view.component';
import { CommonModule } from '@angular/common';


describe('JobSummaryParentViewComponent', () => {
  let component: JobSummaryParentViewComponent;
  let fixture: ComponentFixture<JobSummaryParentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobSummaryParentViewComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule, FormsModule, NgxsModule.forRoot([AppState])],
      providers: [API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSummaryParentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
