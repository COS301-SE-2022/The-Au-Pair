import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuPairCostComponent } from './au-pair-cost.component';

describe('AuPairCostComponent', () => {
  let component: AuPairCostComponent;
  let fixture: ComponentFixture<AuPairCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairCostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuPairCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
