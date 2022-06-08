import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service'

@Component({
  selector: 'the-au-pair-au-pair-dashboard',
  templateUrl: './au-pair-dashboard.component.html',
  styleUrls: ['./au-pair-dashboard.component.scss'],
  providers: [API]
})
export class AuPairDashboardComponent  {
  constructor(private api:API) { }

  ngOnInit() {
    const today = this.getToday();
    this.getCurrentTime();

    
    // this.api.getStartedLog("7542108615984", today).subscribe( 
    //   data => {
    //     if(data.equals("")) {
    //       this.alreadyLogging = false;
    //     }
    //     else{
    //       this.alreadyLogging = true;
    //     }
    //   },
    //   error => {
    //     console.log("Error has occured with API: " + error);
    //   }
    // )
  }

  alreadyLogging = true;


  logSwitch() {
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

    // const strDate = ('0' + now.getDate()).slice(-2) + "/" + ('0' + now.getMonth()).slice(-2) +
    // "/" + now.getFullYear();

    console.log(now.getTime())

    // return strDate;
  }
}
