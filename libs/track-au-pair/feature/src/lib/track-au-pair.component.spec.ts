import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAuPairComponent } from './track-au-pair.component';

describe('TrackAuPairComponent', () => {
  let component: TrackAuPairComponent;
  let fixture: ComponentFixture<TrackAuPairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackAuPairComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAuPairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
