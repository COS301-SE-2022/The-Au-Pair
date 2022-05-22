import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentEditActivityComponent } from './parent-edit-activity.component';

describe('ParentEditActivityComponent', () => {
  let component: ParentEditActivityComponent;
  let fixture: ComponentFixture<ParentEditActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentEditActivityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentEditActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
