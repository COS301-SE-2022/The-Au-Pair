import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad{

  constructor() { }

  canLoad() : Observable<boolean>{
    return of(false);
  }
}
