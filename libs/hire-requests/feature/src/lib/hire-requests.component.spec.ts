import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireRequestsComponent } from './hire-requests.component';

describe('HireRequestsComponent', () => {
  let component: HireRequestsComponent;
  let fixture: ComponentFixture<HireRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HireRequestsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
