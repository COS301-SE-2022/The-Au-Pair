import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFieldComponent } from './input-field.component';
import { RouterTestingModule } from  "@angular/router/testing";
import { IonicModule } from '@ionic/angular';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputFieldComponent],
      imports: [RouterTestingModule, IonicModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
