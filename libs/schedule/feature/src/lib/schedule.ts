import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { API } from '../../../../shared/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'the-au-pair-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['schedule.scss'],
})
export class ScheduleComponent implements OnInit{
  days = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ]
  actid = -1;

  curDay =  this.getCurDay(this.days);
  activities: any;

  constructor(private serv: API, private router: Router) {}

  ngOnInit(): void {
      this.getActivities();
  }

  getCurDay(days : string[]) : number {
    const pipe = new DatePipe('en-US');
    const dateStr = pipe.transform(Date.now(),'EEEE');
    return days.findIndex(x => x === dateStr);
  }

  async getActivities()
  {
    this.serv.getSchedule().subscribe(
      res=>{
          this.activities = res;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  navigate(id : string)
  {
    //Route to the edit-activity page and parse the ActivityID of the selected Activity 
    this.router.navigate(['/edit-activity'],{
      state: {id: id}
    });
  }
}

