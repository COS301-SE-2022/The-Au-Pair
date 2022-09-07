import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity , Child , medAid , Parent  , User, HoursLogged, auPair, Notification, Report, Contract} from '../interfaces/interfaces';

@Injectable()
export class API{

  apiURI = "http://theaupair-env.eba-gbyq8pmp.us-east-1.elasticbeanstalk.com";

  constructor(private http: HttpClient) {}

  getActivity(id : String): Observable<any> {
    return this.http.post(this.apiURI+"/getActivity",id);
  }

  editActivity(activity : Activity): Observable<any> {
    return this.http.post(this.apiURI+"/editActivity",activity);
  }
  
  addActivity(activity : Activity): Observable<any> {
    return this.http.post(this.apiURI+"/addActivity",activity);
  }

  removeActivity(id : String): Observable<any> {
    return this.http.post(this.apiURI+"/removeActivity", id);
  }

  removeManyActivities(activities : Activity[]): Observable<any> {
    return this.http.post(this.apiURI+"/removeManyActivities", activities);
  }

  getSchedule(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/getSchedule",id);
  }

  getAuPairSchedule(children : string []): Observable<any> {
    return this.http.post(this.apiURI+"/getAuPairSchedule",children);
  }

  getUser(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/getUser",id);
  }

  editUser(user : User): Observable<any> {
    return this.http.post(this.apiURI+"/editUser",user);
  }

  getParent(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/getParent",id);
  }

  editParent(parent : Parent): Observable<any> {
    return this.http.post(this.apiURI+"/editParent",parent);
  }

  getMedAid(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/getMedAid",id);
  }

  editMedAid(medAid : medAid): Observable<any> {
    return this.http.post(this.apiURI+"/editMedAid",medAid);
  }

  getAuPair(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/getAuPair",id);
  }

  editAuPair(aupair : auPair): Observable<any> {
    return this.http.post(this.apiURI+"/editAuPair",aupair);
  }

  getChildren(id : String): Observable<any> {
    return this.http.post(this.apiURI+"/getChildren",id);
  }

  addChild(child : Child): Observable<any> {
    return this.http.post(this.apiURI+"/addChild",child);
  }

  updateChild(child : Child) :Observable<any> {
    return this.http.post(this.apiURI+"/updateChild",child);
  }

  removeChild(id: String): Observable<any> {
    return this.http.post(this.apiURI+"/removeChild", id);
  }

  getDateMinutes(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post(this.apiURI+"/getDateMinutes", out);
  }

  getAllMinutes(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/getAllMinutes", id);
  }

  getMonthMinutes(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post(this.apiURI+"/getMonthMinutes", out);
  }

  getDateTimes(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post(this.apiURI+"/getDateTimes", out);
  }

  getAllTimes(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/getAllTimes", id);
  }

  getStartedLog(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post(this.apiURI+"/getStartedLog", out, {responseType: 'text'});
  }

  addHoursLog(hl : HoursLogged): Observable<any> {
    return this.http.post(this.apiURI+"/addHoursLog", hl);
  }

  addTimeEnd(id : string, endTime : string): Observable<any> {
    var out = {
      "id" : id,
      "endTime" : endTime
    }
    return this.http.post(this.apiURI+"/addTimeEnd", out);
  }

  updateHoursLog(hl : HoursLogged): Observable<any> {
    return this.http.post(this.apiURI+"/updateHoursLog", hl);
  }

  register(user : User): Observable<any>  {
    return this.http.post(this.apiURI+"/register",user, {responseType: 'text'})
  }

  addParent(parent : Parent): Observable<any> {
    return this.http.post(this.apiURI+"/addParent",parent);
  }

  addAuPair(aupair : auPair): Observable<any> {
    return this.http.post(this.apiURI+"/addAuPair",aupair);
  }

  addContract(contract : Contract): Observable<any> {
    return this.http.post(this.apiURI+"/addContract",contract);
  }

  getContract(id : String): Observable<any> {
    return this.http.post(this.apiURI+"/getContract",id);
  }

  removeContract(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/removeContract",id);
  }

  getContractbyIDs(parentID : String, auPairID : String): Observable<any> {
    var ids = {
      "parentID" : parentID,
      "auPairID" : auPairID
    }
    return this.http.post(this.apiURI+"/getContractbyIDs", ids);
  }

  login(email : string, password : string): Observable<any> {
    var details = {
      "email" : email,
      "password" : password
    } 
    return this.http.post(this.apiURI+"/login",details);
  }

  getAllAuPairs()
  {
    return this.http.get(this.apiURI+"/getAllAuPairs");
  }

  getAllContracts()
  {
    return this.http.get(this.apiURI+"/getAllContracts");
  }
  
  getApplicants(): Observable<any> {
    return this.http.get(this.apiURI+"/getApplicants");
  }

  removeAuPair(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/removeAuPair",id);
  }

  resolveApplication(id : string, resolution : boolean): Observable<any> {
    var decision = {
      "id" : id,
      "resolution" : ""
    }
    if(resolution)
    {
      decision.resolution = "approve";
    }
    else
    {
      decision.resolution = "decline";
      this.removeAuPair(id).subscribe(
        res => {
          console.log("The response is:" + res); 
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      );
    }
    return this.http.post(this.apiURI+"/resolveApplication",decision);
  }

  getNotificationsByParentId(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/getNotifcationsByParentId",id);
  }

  getNotificationsByAuPairId(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/getNotifcationsByAuPairId",id);
  }

  logNotification(notification : Notification): Observable<any> {
    return this.http.post(this.apiURI+"/logNotification",notification);
  }

  getAllReports(): Observable<any> 
  {
    return this.http.get(this.apiURI+"/getAllReports");
  }
  
  getReportsForUser(id : string): Observable<any> {
    return this.http.post(this.apiURI+'/getReportsForAuPair', id);
  }

  deleteReport(id : string): Observable<any> {
    return this.http.post(this.apiURI+"/deleteReport",id);
  }

  addReport(report : Report): Observable<any> {
    return this.http.post(this.apiURI+"/addReport",report);
  }
  
}
