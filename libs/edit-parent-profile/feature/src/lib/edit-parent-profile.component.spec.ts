import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParentProfileComponent } from './edit-parent-profile.component';

describe('EditParentProfileComponent', () => {
  let component: EditParentProfileComponent;
  let fixture: ComponentFixture<EditParentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditParentProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
