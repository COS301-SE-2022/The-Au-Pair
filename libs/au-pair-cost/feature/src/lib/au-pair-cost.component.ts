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

  pieSplit = "conic-gradient(var(--ion-color-primary)" + this.otherDeg + "deg, var(--ion-color-secondary) 0 "+ this.activityDeg +"deg, var(--ion-color-champagne) 0)";

  ngOnInit() { 
    // this.api.getUser().subscribe( 
    //   data => { 
    //     this.auPairName = data.name
    //   },
    //   error => {
    //     console.error();
    //   }
    // )

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
        this.calculatePie(this.travelCost, this.activityCost, this.otherCost, this.totalCost);
        this.pieSplit = "conic-gradient(var(--ion-color-primary)" + this.otherDeg + "deg, var(--ion-color-secondary) 0 "+ this.activityDeg +"deg, var(--ion-color-champagne) 0)";
      },
      error => {
        console.error();
      }
    )
    
  }

  calculatePie(dist:number, act:number, other:number, total:number) {
    this.otherDeg = (360/total)*other;
    this.activityDeg = this.otherDeg + (360/total)*act;
  }

}
