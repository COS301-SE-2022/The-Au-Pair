import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuPairScheduleComponent } from './au-pair-schedule.component';

describe('AuPairScheduleComponent', () => {
  let component: AuPairScheduleComponent;
  let fixture: ComponentFixture<AuPairScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairScheduleComponent],
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
});
