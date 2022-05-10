import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAddActivityComponent } from './parent-add-activity.component';

describe('ParentAddActivityComponent', () => {
  let component: ParentAddActivityComponent;
  let fixture: ComponentFixture<ParentAddActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentAddActivityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentAddActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
