import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentNotificationsComponent } from './notifications.component';

describe('ParentNotificationsComponent', () => {
  let component: ParentNotificationsComponent;
  let fixture: ComponentFixture<ParentNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentNotificationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
