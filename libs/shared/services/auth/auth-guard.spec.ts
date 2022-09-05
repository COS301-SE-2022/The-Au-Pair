import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { StoredCallback } from '@capacitor/core/types/definitions-internal';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../ngxs/state';
import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: StoredCallback;
  let router : Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
     imports:[
      RouterModule.forRoot([]),
      NgxsModule.forRoot([AppState])
     ]
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


  it('Should send not logged in user back to login page', () => {
    spyOn(router, 'navigateByUrl');

    guard.canLoad().subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login-page');
    })
  });

 
});
