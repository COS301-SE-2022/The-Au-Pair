import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AppState } from '../../../ngxs/state';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad{

  constructor(private store : Store, private router: Router) {}

  canLoad() : Observable<boolean>{
    return this.store.select(AppState.getLoggedIn).pipe(
      switchMap((loggedIn) => {
        if (loggedIn) {
          return of(true);
        }
        else{
          this.router.navigateByUrl('/login-page');
          return of(false);
        }
      })
    )
  }
}
