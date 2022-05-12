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

  pieSplit = "";

  ngOnInit() { 
    this.api.getUser().subscribe( 
      data => { 
        this.auPairName = data.fname
      },
      error => {
        console.error();
      }
    )

    this.api.getAuPair().subscribe( 
      data => { 
        this.hourlyRate = data.payRate;
        this.totalHours = data.hoursWorked;
        this.travelCost = data.distTraveled;
        this.activityCost = data.costIncurred;
        this.otherCost = 180; 
        this.totalCost = this.travelCost+this.activityCost+this.otherCost;
        this.totalCost = Number(this.totalCost.toFixed(3))
        this.totalRemuneration = (this.hourlyRate*this.totalHours) + this.totalCost; 
        this.totalRemuneration = Number(this.totalRemuneration.toFixed(3))

        this.calculatePie(this.otherCost, this.activityCost, this.totalCost);
        this.populateDaysCost();
        this.pieSplit = "conic-gradient(var(--ion-color-primary)" + this.otherDeg + "deg, var(--ion-color-secondary) 0 "+ this.activityDeg +"deg, var(--ion-color-champagne) 0)";
      },
      error => {
        console.error();
      }
    )
    
  }

  calculatePie(other:number, act:number, total:number) {
    this.otherDeg = (360/total)*other;
    this.activityDeg = this.otherDeg + (360/total)*act;
  }

  populateDaysCost() {
    //This is mock data for the moment
    this.dayHoursWorked[0] = 8;
    this.dayHoursWorked[1] = 4; 
    this.dayHoursWorked[2] = 7; 
    this.dayHoursWorked[3] = 4; 
    this.dayHoursWorked[4] = 6; 
    this.dayHoursWorked[5] = 3; 
    this.dayHoursWorked[6] = 0; 
  }

}
