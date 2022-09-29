import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from  "@angular/router/testing";
import { IonicModule, MenuController, ToastController } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../../shared/ngxs/state';
import { Router } from '@angular/router';

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

  //test when user type is 0 that router navigates to admin-console
  it('should navigate to admin-console when user type is 0', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.type = 0;
    component.dash();
    expect(spy).toHaveBeenCalledWith(['/admin-console']);
  });

  //test when user type is 1 that router navigates to parent-dashboard
  it('should navigate to parent-dashboard when user type is 1', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.type = 1;
    component.dash();
    expect(spy).toHaveBeenCalledWith(['/parent-dashboard']);
  });

  //test when user type is 2 that router navigates to au-pair-dashboard
  it('should navigate to au-pair-dashboard when user type is 2', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.type = 2;
    component.dash();
    expect(spy).toHaveBeenCalledWith(['/au-pair-dashboard']);
  });

  //test when notifications is calles that router navigates to notifications
  it('should navigate to notifications when notifications is clicked', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.notifications();
    expect(spy).toHaveBeenCalledWith(['/notifications']);
  });

  //test when profile is called with type 1 that router navigates to parent-profile
  it('should navigate to parent-profile when profile is called with type 1', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.type = 1;
    component.profile();
    expect(spy).toHaveBeenCalledWith(['/parent-profile']);
  });

  //test when profile is called with type 2 that router navigates to au-pair-profile
  it('should navigate to au-pair-profile when profile is called with type 2', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.type = 2;
    component.profile();
    expect(spy).toHaveBeenCalledWith(['/au-pair-profile']);
  });

  //test when menuOpen is called that menuContoller.open() is called
  it('should call menuContoller.open() when menuOpen is called', () => {
    const menuController = TestBed.inject(MenuController);
    const spy = jest.spyOn(menuController, 'open');
    component.menuOpen();
    expect(spy).toHaveBeenCalled();
  });

  //test when menuClose is called that menuContoller.close() is called
  it('should call menuContoller.close() when menuClose is called', () => {
    const menuController = TestBed.inject(MenuController);
    const spy = jest.spyOn(menuController, 'close');
    component.menuClose();
    expect(spy).toHaveBeenCalled();
  });

  //test when logout is called that the store dispatches a new Reset 
  it('should dispatch a new Reset when logout is called', () => {
    const store = TestBed.inject(AppState);
    const spy = jest.spyOn(store, 'reset');
    component.logout();
    expect(spy).toHaveBeenCalled();
  });

  //test when logout is called that router navigates to login
  it('should navigate to login when logout is called', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.logout();
    expect(spy).toHaveBeenCalledWith(['/login-page']);
  });

  //test when reports is called with type 0 that router navigates to admin-reports
  it('should navigate to admin-reports when reports is called with type 0', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.type = 0;
    component.reports();
    expect(spy).toHaveBeenCalledWith(['/admin-reports']);
  });

  //test when reports is called with type != 0 that router does not navigate
  it('should not navigate when reports is called with type != 0', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.type = 1;
    component.reports();
    expect(spy).not.toHaveBeenCalled();
  });

  //test when openToast is called that toastController.create() is called
  it('should call toastController.create() when openToast is called', () => {
    const toastController = TestBed.inject(ToastController);
    const spy = jest.spyOn(toastController, 'create');
    component.openToast("Some message");
    expect(spy).toHaveBeenCalled();
  });
});
