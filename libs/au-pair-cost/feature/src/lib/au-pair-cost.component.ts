import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service'

@Component({
  selector: 'the-au-pair-au-pair-cost',
  templateUrl: './au-pair-cost.component.html',
  styleUrls: ['./au-pair-cost.component.scss'],
  providers: [API]
})
export class AuPairCostComponent implements OnInit {

  constructor(private api:API) { }

  days = [
    "Mon","Tue","Wed","Thu","Fri","Sat","Sun"
  ];

  months = [
    "January","February","March","April","May","June","July","August","September","October","November","December"
  ];

  dayHoursWorked = [
    0, 0, 0, 0, 0, 0 ,0
  ];

  auPairName = "";
  hourlyRate = 0;
  totalHours = 0;
  totalRemuneration = 0;

  travelCost = 0;
  activityCost = 0;
  otherCost = 180;
  totalCost = 0;

  otherDeg = 0;
  activityDeg = 0;

  dateRange = "";

  pieSplit = "";

  ngOnInit() { 
    this.api.getUser("7542108615984").subscribe( 
      data => { 
        this.auPairName = data.fname
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

    this.api.getMonthMinutes("7542108615984", this.getStartDateOfWeek(0)).subscribe( 
      data => {
        this.totalHours = Number((data/60).toFixed(3));
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

    this.api.getAuPair("7542108615984").subscribe( 
      data => { 
        this.hourlyRate = data.payRate;
        this.travelCost = data.distTraveled;
        this.activityCost = data.costIncurred;
        this.otherCost = 180; 
        this.totalCost = this.travelCost+this.activityCost+this.otherCost;
        this.totalCost = Number(this.totalCost.toFixed(3))
        this.totalRemuneration = (this.hourlyRate*this.totalHours) + this.totalCost; 
        this.totalRemuneration = Number(this.totalRemuneration.toFixed(3))

        this.calculatePie(this.otherCost, this.activityCost, this.totalCost);
        this.populateDaysCost();
        this.dateRange = this.dateRangeToString(7);
        this.pieSplit = "conic-gradient(var(--ion-color-primary)" + this.otherDeg + "deg, var(--ion-color-secondary) 0 "+ this.activityDeg +"deg, var(--ion-color-champagne) 0)";
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
    
  }

  calculatePie(other:number, act:number, total:number) {
    this.otherDeg = (360/total)*other;
    this.activityDeg = this.otherDeg + (360/total)*act;
  }

  populateDaysCost() {
    for (let i = 0; i < 7; i++) {
      
      const weekDay = this.getStartDateOfWeek(i);
      this.api.getDateMinutes("7542108615984", weekDay).subscribe( 
        data => {
          this.dayHoursWorked[i] = data/60;
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      )
    }
  }

  getStartDateOfWeek(dow : number) {
    const now = new Date();
    const day = now.getDay();
    now.setMonth(now.getMonth()+1);
    
    const diff =  new Date(now.setDate(now.getDate() - day + dow + (day == 0 ? 6:1)));

    const strDate = ('0' + diff.getDate()).slice(-2) + "/" + ('0' + diff.getMonth()).slice(-2) +
    "/" + diff.getFullYear();

    return strDate;
  }

  dateRangeToString(range : number) {
    const now = new Date();
    const day = now.getDay();
    
    const diff =  new Date(now.setDate(now.getDate() - day + (day == 0 ? 6:1)));

    const strDate = ('0' + diff.getDate()).slice(-2) + " " + (this.months[diff.getMonth()]) +
    " - " + ('0' + (diff.getDate()+range)).slice(-2) + " " + (this.months[diff.getMonth()])

    return strDate;
  }

}
