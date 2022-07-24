import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service'
import { HoursLogged } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-au-pair-dashboard',
  templateUrl: './au-pair-dashboard.component.html',
  styleUrls: ['./au-pair-dashboard.component.scss'],
  providers: [API]
})
export class AuPairDashboardComponent implements OnInit {
  
  employer : any;
  employerName!: string;
  employerSurname! : string;
  employerId! : string;
  employerPhone! : string;
  children: any[] = [];

  alreadyLogging = false;
  logID = "";

  hoursLogDetail: HoursLogged = {
    id: "",
    user: "",
    date: "",
    timeStart: "",
    timeEnd: ""
  };
  
  constructor(private serv: API) {}

  async ngOnInit(): Promise<void> {
    await this.getEmployer();

    const todaysDate = this.getToday();
    this.serv.getStartedLog("7542108615984", todaysDate).subscribe( 
      data => {
        if(data == null || data == "") {
          this.alreadyLogging = false;
        }
        else{
          this.logID = data;
          this.alreadyLogging = true;
        }
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
  }

  logSwitch() {
    if(this.alreadyLogging) {
      if(this.logID == null || this.logID == "") {
        this.serv.getStartedLog("7542108615984", this.getToday()).subscribe( 
          data => {
            this.logID = data;
          },
          error => {
            console.log("Error has occured with API: " + error);
          }
        )
      }

      this.serv.addTimeEnd(this.logID, this.getCurrentTime()).subscribe( 
        data => {
          this.alreadyLogging = !this.alreadyLogging;
          console.log("The response is:" + data); 
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      )
    }
    else {
      this.hoursLogDetail.user = "7542108615984";
      this.hoursLogDetail.date = this.getToday();
      this.hoursLogDetail.timeStart = this.getCurrentTime();
      this.serv.addHoursLog(this.hoursLogDetail).subscribe( 
        res=>{
          this.alreadyLogging = !this.alreadyLogging;
          console.log("The response is:" + res); 
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      )
    }
  }

  getToday() {
    const now = new Date();
    now.setMonth(now.getMonth()+1);

    const strDate = ('0' + now.getDate()).slice(-2) + "/" + ('0' + now.getMonth()).slice(-2) +
    "/" + now.getFullYear();

    return strDate;
  }

  getCurrentTime() {
    const now = new Date();

    const strTime = ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2);

    return strTime;
  }

  async getEmployer(){
    this.serv.getUser("4561237814867").subscribe(
      res=>{
          this.employer = res;
          this.employerName = this.employer.fname;
          this.employerSurname = this.employer.sname;
          this.employerId = this.employer.id;
          this.employerPhone = this.employer.number;
          this.getChildren();
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  async getChildren(){
    this.serv.getChildren(this.employerId).subscribe(
      res=>{
        let i = 0;
        res.forEach((element: string) => {
          this.children[i++] = element;
          
        });
      },
      error =>{console.log("Error has occured with API: " + error);}
      
    )
  }
}
