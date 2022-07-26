import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { API } from '../../../../shared/api/api.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Activity } from '../../../../shared/interfaces/interfaces';
import { NgModel } from '@angular/forms';

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
  children : any[] = [];
  selectedChild = {
    id: "",
    name: "",
  };
  selectedChildName = "";

  curDay =  this.getCurDay(this.days);
  activities: Activity[] = [];

  constructor(private serv: API, private router: Router, private store: Store) {}

  ngOnInit(): void {
      this.parentID = this.store.snapshot().user.id;
      this.getParentChildren();
  }

  getSelectedChild(){
    this.children.forEach(element => {
      if(element.name == this.selectedChildName){
        this.selectedChild.id = element.id;
      }
    });
    this.getActivities(this.selectedChild.id)
  }

  getParentChildren(){
    this.serv.getChildren(this.parentID).toPromise().then(
      res => {
      res.forEach((element: any) => {
        const child = {
          id: element.id,
          name: element.fname,
        }
        this.children.push(child);
      });
      console.log(this.children)
    });
  }

  getCurDay(days : string[]) : number {
    const pipe = new DatePipe('en-US');
    const dateStr = pipe.transform(Date.now(),'EEEE');
    return days.findIndex(x => x === dateStr);
  }

  async getActivities(childID : string)
  {
    this.serv.getSchedule(childID).subscribe(
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

