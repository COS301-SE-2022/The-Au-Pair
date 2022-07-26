import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { API } from '../../../../shared/api/api.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Activity } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['schedule.scss'],
})
export class ScheduleComponent implements OnInit{
  parentID = "";
  days = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ]
  actid = -1;
  childrenNames : string[] = [];

  curDay =  this.getCurDay(this.days);
  activities: Activity[] = [];

  constructor(private serv: API, private router: Router, private store: Store) {}

  ngOnInit(): void {
      this.parentID = this.store.snapshot().user.id;
      this.getParentChildren();
      this.getActivities();
  }

  getParentChildren(){
    this.serv.getChildren(this.parentID).toPromise().then(
      res => {
      res.forEach((element: { fname: string; }) => {
        this.childrenNames.push(element.fname);
      });
    });
  }

  getCurDay(days : string[]) : number {
    const pipe = new DatePipe('en-US');
    const dateStr = pipe.transform(Date.now(),'EEEE');
    return days.findIndex(x => x === dateStr);
  }

  async getActivities()
  {
    this.serv.getSchedule("8675945310542").subscribe(
      res=>{
          this.activities = res;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  navigateEdit(id : string)
  { 
    //Route to the edit-activity page and parse the ActivityID of the selected Activity 
    this.router.navigate(['/edit-activity'],{
      state: {id: id}
    });
  }

  navigateViewActivity(id : string)
  { 
    //Route to the edit-activity page and parse the ActivityID of the selected Activity 
    this.router.navigate(['/view-activity'],{
      state: {id: id}
    });
  }
}

