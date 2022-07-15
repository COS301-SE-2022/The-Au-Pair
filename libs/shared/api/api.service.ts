import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity , Child , medAid , Parent  , User, HoursLogged } from '../interfaces/interfaces';


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

  getSchedule(id : string): Observable<any> {
    return this.http.post('http://localhost:8080/getSchedule',id);
  }

  getAuPairSchedule(children : string []): Observable<any> {
    return this.http.post('http://localhost:8080/getAuPairSchedule',children);
  }

  getUser(id : string): Observable<any> {
    return this.http.post('http://localhost:8080/getUser',id);
  }

  editUser(user : User): Observable<any> {
    return this.http.post('http://localhost:8080/editUser',user);
  }

  getParent(id : string): Observable<any> {
    return this.http.post('http://localhost:8080/getParent',id);
  }

  editParent(parent : Parent): Observable<any> {
    return this.http.post('http://localhost:8080/editParent',parent);
  }

  getMedAid(id : string): Observable<any> {
    return this.http.post('http://localhost:8080/getMedAid',id);
  }

  editMedAid(medAid : medAid): Observable<any> {
    return this.http.post('http://localhost:8080/editMedAid',medAid);
  }

  getAuPair(id : string): Observable<any> {
    return this.http.post('http://localhost:8080/getAuPair',id);
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

  getMonthMinutes(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post("http://localhost:8080/getMonthMinutes", out);
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
    return this.http.post("http://localhost:8080/getStartedLog", out, {responseType: 'text'});
  }

  addHoursLog(hl : HoursLogged): Observable<any> {
    return this.http.post("http://localhost:8080/addHoursLog", hl);
  }

  addTimeEnd(id : string, endTime : string): Observable<any> {
    var out = {
      "id" : id,
      "endTime" : endTime
    }
    return this.http.post("http://localhost:8080/addTimeEnd", out);
  }

  updateHoursLog(hl : HoursLogged): Observable<any> {
    return this.http.post("http://localhost:8080/updateHoursLog", hl);
  }

  registerParent(user : User, parent : Parent):  Observable<any>  {
    return this.http.post('http://localhost:8080/register',user, {responseType: 'text'})
  }

  registerAuPair(user : User, aupair : auPair): Observable<any> {
    return this.http.post('http://localhost:8080/register',user, {responseType: 'text'})
  }

  login(email : string, password : string): Observable<any> {
    var details = {
      "email" : email,
      "password" : password
    } 
    return this.http.post('http://localhost:8080/login',details, {responseType: 'text'});
  }
}
