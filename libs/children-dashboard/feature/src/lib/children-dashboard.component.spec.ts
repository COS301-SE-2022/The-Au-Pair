import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenDashboardComponent } from './children-dashboard.component';

describe('ChildrenDashboardComponent', () => {
  let component: ChildrenDashboardComponent;
  let fixture: ComponentFixture<ChildrenDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildrenDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
