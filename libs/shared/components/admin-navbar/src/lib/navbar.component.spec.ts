import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNavbarComponent } from './navbar.component';
import { RouterTestingModule } from  "@angular/router/testing";
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: AdminNavbarComponent;
  let fixture: ComponentFixture<AdminNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNavbarComponent],
      imports: [RouterTestingModule, IonicModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Testing to be changed for future links
  // it('should, have a redirect to admin', () => {
  //   const href = fixture.debugElement.query(By.css('#cost')).nativeElement
  //   .getAttribute('routerLink');
  //   expect(href).toEqual('/au-pair-cost'); 
  // });

  // it('should, have a redirect to the edit parent profile page', () => {
  //   const href = fixture.debugElement.query(By.css('#profile')).nativeElement
  //   .getAttribute('routerLink');
  //   expect(href).toEqual('/parent-profile'); 
  // });
});
