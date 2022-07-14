import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordFieldComponent } from './password-field.component';
import { RouterTestingModule } from  "@angular/router/testing";
import { IonicModule } from '@ionic/angular';

describe('passwordFieldComponent', () => {
  let component: PasswordFieldComponent;
  let fixture: ComponentFixture<PasswordFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordFieldComponent],
      imports: [RouterTestingModule, IonicModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
