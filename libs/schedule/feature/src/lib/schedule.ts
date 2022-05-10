import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { pipe } from 'rxjs';

@Component({
  selector: 'the-au-pair-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['schedule.scss'],
})
export class ScheduleComponent{
   days = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ]

   curDay = getCurDay(this.days);
}

function getCurDay(days : string[]) : number {
  const pipe = new DatePipe('en-US');
  const dateStr = pipe.transform(Date.now(),'EEEE');
  return days.findIndex(x => x === dateStr);
  }