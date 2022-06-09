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
  constructor(private api:API) { }
  
  employer : any;
  employerName!: string;
  employerSurname! : string;
  employerId! : string;
  children: any[] = [];

  alreadyLogging = true;
  logID = "";

  hoursLogDetail: HoursLogged = {
    id: "",
    user: "",
    date: "",
    timeStart: "",
    timeEnd: ""
  };

  ngOnInit() {    
    this.api.getStartedLog("7542108615984", this.getToday()).subscribe( 
      data => {
        if(data == null || data.equals("")) {
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
        this.api.getStartedLog("7542108615984", this.getToday()).subscribe( 
          data => {
            this.logID = data;
          },
          error => {
            console.log("Error has occured with API: " + error);
          }
        )
      }

      this.api.addTimeEnd(this.logID, this.getCurrentTime()).subscribe( 
        error => {
          console.log("Error has occured with API: " + error);
        }
      )
    }
    else {
      this.hoursLogDetail.user = "7542108615984";
      this.hoursLogDetail.date = this.getToday();
      this.hoursLogDetail.timeStart = this.getCurrentTime();
      this.api.addHoursLog(this.hoursLogDetail).subscribe( 
        res=>{
          console.log("The response is:" + res); 
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      )
    }

    this.alreadyLogging = !this.alreadyLogging;
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
}

  constructor(private serv: API) {}

  async ngOnInit(): Promise<void> {
    await this.getEmployer();
  }

  async getEmployer(){
    this.serv.getUser("4561237814867").subscribe(
      res=>{
          this.employer = res;
          this.employerName = this.employer.fname;
          this.employerSurname = this.employer.sname;
          this.employerId = this.employer.id;
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
