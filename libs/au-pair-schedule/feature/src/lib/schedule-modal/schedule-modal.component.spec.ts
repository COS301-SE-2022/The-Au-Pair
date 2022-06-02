import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleModalComponent } from './schedule-modal.component';

describe('ScheduleModalComponent', () => {
  let component: ScheduleModalComponent;
  let fixture: ComponentFixture<ScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleModalComponent],
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
});
