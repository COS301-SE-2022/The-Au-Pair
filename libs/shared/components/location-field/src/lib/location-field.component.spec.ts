import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationFieldComponent } from './location-field.component';
import { RouterTestingModule } from  "@angular/router/testing";
import { IonicModule } from '@ionic/angular';

describe('LocationFieldComponent', () => {
  let component: LocationFieldComponent;
  let fixture: ComponentFixture<LocationFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationFieldComponent],
      imports: [RouterTestingModule, IonicModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
