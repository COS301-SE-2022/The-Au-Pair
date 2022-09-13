import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../../ngxs/state';
import { AuthGuard } from './auth-guard';
import { APP_BASE_HREF } from '@angular/common';
import { SetLoggedIn } from '../../../ngxs/actions';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: Store;
  let router : Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
     imports:[
      RouterModule.forRoot([]),
      NgxsModule.forRoot([AppState])
     ],
     providers: [
      {provide: APP_BASE_HREF, useValue: '/'},
     ]
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


  it('Should send non-logged-in user back to login page', () => {
    jest.spyOn(router, 'navigateByUrl');

    guard.canLoad().subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login-page');
    })
  });

 it('Should allow logged in user to access page', () =>{
  store.dispatch(new SetLoggedIn(true));

  guard.canLoad().subscribe((result) => {
    expect(result).toBeTruthy();
 })
});
 
});
