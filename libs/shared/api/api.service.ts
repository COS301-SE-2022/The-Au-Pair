import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity , Child , medAid , Parent  , User, HoursLogged, auPair, Notification, Report, Contract, Email} from '../interfaces/interfaces';
import { environment } from '../../../apps/the-au-pair/src/environments/environment';
@Injectable()
export class API{

  constructor(private http: HttpClient) {}

  getActivity(id : String): Observable<any> {
    return this.http.post(environment.apiURI+"/getActivity",id);
  }

  editActivity(activity : Activity): Observable<any> {
    return this.http.post(environment.apiURI+"/editActivity",activity);
  }
  
  addActivity(activity : Activity): Observable<any> {
    return this.http.post(environment.apiURI+"/addActivity",activity);
  }

  removeActivity(id : String): Observable<any> {
    return this.http.post(environment.apiURI+"/removeActivity", id);
  }

  removeManyActivities(activities : Activity[]): Observable<any> {
    return this.http.post(environment.apiURI+"/removeManyActivities", activities);
  }

  getSchedule(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getSchedule",id);
  }

  getAuPairSchedule(children : string []): Observable<any> {
    return this.http.post(environment.apiURI+"/getAuPairSchedule",children);
  }

  getUser(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getUser",id);
  }

  editUser(user : User): Observable<any> {
    return this.http.post(environment.apiURI+"/editUser",user);
  }

  getParent(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getParent",id);
  }

  editParent(parent : Parent): Observable<any> {
    return this.http.post(environment.apiURI+"/editParent",parent);
  }

  getMedAid(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getMedAid",id);
  }

  editMedAid(medAid : medAid): Observable<any> {
    return this.http.post(environment.apiURI+"/editMedAid",medAid);
  }

  getAuPair(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getAuPair",id);
  }

  editAuPair(aupair : auPair): Observable<any> {
    return this.http.post(environment.apiURI+"/editAuPair",aupair);
  }

  getChildren(id : String): Observable<any> {
    return this.http.post(environment.apiURI+"/getChildren",id);
  }

  addChild(child : Child): Observable<any> {
    return this.http.post(environment.apiURI+"/addChild",child, {responseType: "text"});
  }

  updateChild(child : Child) :Observable<any> {
    return this.http.post(environment.apiURI+"/updateChild",child);
  }

  removeChild(id: String): Observable<any> {
    return this.http.post(environment.apiURI+"/removeChild", id);
  }

  getDateMinutes(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post(environment.apiURI+"/getDateMinutes", out);
  }

  getAllMinutes(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getAllMinutes", id);
  }

  getMonthMinutes(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post(environment.apiURI+"/getMonthMinutes", out);
  }

  getDateTimes(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post(environment.apiURI+"/getDateTimes", out);
  }

  getAllTimes(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getAllTimes", id);
  }

  getStartedLog(id : string, date : string): Observable<any> {
    var out = {
      "id" : id,
      "date" : date
    }
    return this.http.post(environment.apiURI+"/getStartedLog", out, {responseType: 'text'});
  }

  addHoursLog(hl : HoursLogged): Observable<any> {
    return this.http.post(environment.apiURI+"/addHoursLog", hl);
  }

  addTimeEnd(id : string, endTime : string): Observable<any> {
    var out = {
      "id" : id,
      "endTime" : endTime
    }
    return this.http.post(environment.apiURI+"/addTimeEnd", out);
  }

  updateHoursLog(hl : HoursLogged): Observable<any> {
    return this.http.post(environment.apiURI+"/updateHoursLog", hl);
  }

  register(user : User): Observable<any>  {
    return this.http.post(environment.apiURI+"/register",user, {responseType: 'text'})
  }

  addParent(parent : Parent): Observable<any> {
    return this.http.post(environment.apiURI+"/addParent",parent);
  }

  addAuPair(aupair : auPair): Observable<any> {
    return this.http.post(environment.apiURI+"/addAuPair",aupair);
  }

  addContract(contract : Contract): Observable<any> {
    return this.http.post(environment.apiURI+"/addContract",contract);
  }

  getContract(id : String): Observable<any> {
    return this.http.post(environment.apiURI+"/getContract",id);
  }

  removeContract(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/removeContract",id);
  }

  getContractbyIDs(parentID : String, auPairID : String): Observable<any> {
    var ids = {
      "parentID" : parentID,
      "auPairID" : auPairID
    }
    return this.http.post(environment.apiURI+"/getContractbyIDs", ids);
  }

  login(email : string, password : string): Observable<any> {
    var details = {
      "email" : email,
      "password" : password
    } 
    return this.http.post(environment.apiURI+"/login",details);
  }

  getAllAuPairs()
  {
    return this.http.get(environment.apiURI+"/getAllAuPairs");
  }

  getAllContracts()
  {
    return this.http.get(environment.apiURI+"/getAllContracts");
  }
  
  getApplicants(): Observable<any> {
    return this.http.get(environment.apiURI+"/getApplicants");
  }

  removeAuPair(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/removeAuPair",id);
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
    return this.http.post(environment.apiURI+"/resolveApplication",decision);
  }

  getNotificationsByParentId(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getNotifcationsByParentId",id);
  }

  getNotificationsByAuPairId(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getNotifcationsByAuPairId",id);
  }

  logNotification(notification : Notification): Observable<any> {
    return this.http.post(environment.apiURI+"/logNotification",notification);
  }

  getAllReports(): Observable<any> 
  {
    return this.http.get(environment.apiURI+"/getAllReports");
  }
  
  getReportsForUser(id : string): Observable<any> {
    return this.http.post(environment.apiURI+'/getReportsForUser', id);
  }

  deleteReport(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/deleteReport",id);
  }

  addReport(report : Report): Observable<any> {
    return this.http.post(environment.apiURI+"/addReport",report);
  }

  sendEmail(email : Email): Observable<any> {
    return this.http.post(environment.apiURI+"/sendEmail",email);
  }

  storeFile(file : File, filename : string): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file, filename);
    const newRequest = new HttpRequest('POST', environment.apiURI+"/uploadFile", data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }

  getFile(file : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getFile",file,{responseType: 'blob'});
  }
  
  getAuPairEmployer(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getAuPairEmployer",id);
  }

  getFCMToken(id : string): Observable<any> {
    return this.http.post(environment.apiURI+"/getFCMToken",id, {responseType: 'text'});
  }

  setFCMToken(id : string, token : string): Observable<any> {
    var fcmObject = {
      "id" : id,
      "token" : token
    }
    return this.http.post(environment.apiURI+"/setFCMToken",fcmObject);
  }
}
