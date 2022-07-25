import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuPairNavbarComponent } from './navbar.component';
import { RouterTestingModule } from  "@angular/router/testing";
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: AuPairNavbarComponent;
  let fixture: ComponentFixture<AuPairNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairNavbarComponent],
      imports: [RouterTestingModule, IonicModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuPairNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should, have a redirect to the au pair cost page', () => {
    const href = fixture.debugElement.query(By.css('#cost')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/au-pair-cost'); 
  });

  it('should, have a redirect to the edit parent profile page', () => {
    const href = fixture.debugElement.query(By.css('#profile')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/parent-profile'); 
  });
});
