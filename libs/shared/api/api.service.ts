import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity , Child, HoursLogged } from '../interfaces/interfaces';


@Injectable()
export class API{

  constructor(private http: HttpClient) {}

  getActivity(id : String): Observable<any> {
    return this.http.post('http://localhost:8080/getActivity',id);
  }

  editActivity(activity : Activity): Observable<any> {
    return this.http.post('http://localhost:8080/editActivity',activity);
  }
  
  addActivity(activity : Activity): Observable<any> {
    return this.http.post('http://localhost:8080/addActivity',activity);
  }

  getSchedule(): Observable<any> {
    return this.http.get('http://localhost:8080/getSchedule');
  }

  getAuPairSchedule(children : string []): Observable<any> {
    return this.http.post('http://localhost:8080/getAuPairSchedule',children);
  }

  getUser(): Observable<any> {
    return this.http.get('http://localhost:8080/getUser');
  }

  getParent(): Observable<any> {
    return this.http.get('http://localhost:8080/getParent');
  }

  getAuPair(): Observable<any> {
    return this.http.get('http://localhost:8080/getAuPair');
  }

  getChildren(id : String): Observable<any> {
    return this.http.post('http://localhost:8080/getChildren',id);
  }

  addChild(child : Child): Observable<any> {
    return this.http.post('http://localhost:8080/addChild',child);
  }

  getDateMinutes(id : string, date : string) {
    return this.http.post("http://localhost:4200/getDateMinutes", id, date);
  }

  getAllMinutes(id : string) {
    return this.http.post("http://localhost:4200/getAllMinutes", id);
  }

  getDateTimes(id : string, date : string) {
    return this.http.post("http://localhost:4200/getDateTimes", id, date);
  }

  getAllTimes(id : string) {
    return this.http.post("http://localhost:4200/getAllTimes", id);
  }

  addHoursLog(hl : HoursLogged) {
    return this.http.post("http://localhost:4200/addHoursLog", hl);
  }

  updateHoursLog(hl : HoursLogged) {
    return this.http.post("http://localhost:4200/updateHoursLog", hl);
  }
}
