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

  getDateMinutes(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post("http://localhost:8080/getDateMinutes", out);
  }

  getAllMinutes(id : string): Observable<any> {
    return this.http.post("http://localhost:8080/getAllMinutes", id);
  }

  getDateTimes(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post("http://localhost:8080/getDateTimes", out);
  }

  getAllTimes(id : string): Observable<any> {
    return this.http.post("http://localhost:8080/getAllTimes", id);
  }

  getStartedLog(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post("http://localhost:8080/getStartedLog", out);
  }

  addHoursLog(hl : HoursLogged): Observable<any> {
    return this.http.post("http://localhost:8080/addHoursLog", hl);
  }

  updateHoursLog(hl : HoursLogged): Observable<any> {
    return this.http.post("http://localhost:8080/updateHoursLog", hl);
  }
}
