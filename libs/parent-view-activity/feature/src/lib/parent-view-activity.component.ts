import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { API } from '../../../../shared/api/api.service';
import { Activity } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-parent-view-activity',
  templateUrl: './parent-view-activity.component.html',
  styleUrls: ['./parent-view-activity.component.scss'],
})
export class ParentViewActivityComponent implements OnInit
{
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Variables**/

   //Activity Model
   activityDetails: Activity = {
    id: "",
    name: "",
    description: "",
    location: "",
    boundary: 0.0,
    timeStart: "",
    timeEnd: "",
    budget: 0.0,
    comment: "",
    behavior: 0,
    day: "",
    child: "",
  };
  timeslot = "";
  constructor(private serv: API, private router: Router, private store: Store)
  {
    this.activityDetails.id=this.store.snapshot().user.currentActivity;
  }

  ngOnInit(): void
  {
    this.getActivityDetails();
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Service calls**/
  getActivityDetails()
  { 
    this.serv.getActivity(this.activityDetails.id).subscribe(
      res=>{
        console.log("The response is:" + res); 
        this.activityDetails.id = res.id;
        this.activityDetails.name = res.name;
        this.activityDetails.description = res.description;
        this.activityDetails.location = res.location;
        this.activityDetails.boundary = res.boundary;
        this.activityDetails.day = res.day;
        this.activityDetails.timeStart = res.timeStart;
        this.activityDetails.timeEnd = res.timeEnd;
        this.activityDetails.behavior = res.behavior;
        this.activityDetails.comment = res.comment;
        this.activityDetails.budget = res.budget;
        this.activityDetails.child = res.child;
        this.timeslot = res.timeStart + "-" + res.timeEnd
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  };

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Navigation**/

  returnToSchedule()
  {
    this.router.navigate(['/schedule']);
  }
}
