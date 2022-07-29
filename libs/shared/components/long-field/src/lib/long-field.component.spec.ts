import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LongFieldComponent } from './long-field.component';
import { RouterTestingModule } from  "@angular/router/testing";
import { IonicModule } from '@ionic/angular';

describe('LongFieldComponent', () => {
  let component: LongFieldComponent;
  let fixture: ComponentFixture<LongFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongFieldComponent],
      imports: [RouterTestingModule, IonicModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
