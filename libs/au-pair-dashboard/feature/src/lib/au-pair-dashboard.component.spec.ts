import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuPairDashboardComponent } from './au-pair-dashboard.component';

describe('AuPairDashboardComponent', () => {
  let component: AuPairDashboardComponent;
  let fixture: ComponentFixture<AuPairDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuPairDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
