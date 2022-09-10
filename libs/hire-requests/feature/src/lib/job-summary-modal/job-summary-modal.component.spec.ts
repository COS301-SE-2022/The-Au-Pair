import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSummaryModalComponent } from './job-summary-modal.component';

describe('JobSummaryModalComponent', () => {
  let component: JobSummaryModalComponent;
  let fixture: ComponentFixture<JobSummaryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobSummaryModalComponent],
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
