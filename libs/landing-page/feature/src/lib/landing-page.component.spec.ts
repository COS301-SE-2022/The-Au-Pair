import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { RouterTestingModule} from '@angular/router/testing';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,NavbarModule,NgxsModule.forRoot([AppState])],
      declarations: [LandingPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
