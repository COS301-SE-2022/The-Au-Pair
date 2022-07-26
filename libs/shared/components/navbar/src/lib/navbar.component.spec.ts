import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from  "@angular/router/testing";
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../../shared/ngxs/state';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule, IonicModule,NgxsModule.forRoot([AppState])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should, have a redirect to the au pair cost page', () => {
    const href = fixture.debugElement.query(By.css('#auPair')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/au-pair-cost'); 
  });

  it('should, have a redirect to the edit parent profile page', () => {
    const href = fixture.debugElement.query(By.css('#profile')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/parent-profile'); 
  });
});
