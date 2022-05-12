import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../interfaces/activity.interfaces';


@Injectable()
export class API{

  constructor(private http: HttpClient) {}

  getSchedule(): Observable<any> {
    return this.http.get('http://localhost:8080/getSchedule');
  }

  getAuPair(): Observable<any> {
    return this.http.get('http://localhost:8080/getAuPair');
  }

  getUser(): Observable<any> {
    return this.http.get('http://localhost:8080/getUser');
  }

  addActivity(activity : Activity): Observable<any> {
    console.log("API return", this.http.post('http://localhost:8080/addActivity',activity));
    return this.http.post('http://localhost:8080/addActivity',activity);
  }

  getParent(): Observable<any> {
    return this.http.get('http://localhost:8080/getParent');
  }
}
