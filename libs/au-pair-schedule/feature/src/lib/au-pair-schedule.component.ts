/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { API } from '../../../../shared/api/api.service';
import { ScheduleModalComponent } from './schedule-modal/schedule-modal.component';

@Component({
  selector: 'the-au-pair-au-pair-schedule',
  templateUrl: './au-pair-schedule.component.html',
  styleUrls: ['./au-pair-schedule.component.scss'],
})
export class AuPairScheduleComponent implements OnInit {

  aupairID = "";

  days = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ]

  curDay =  this.getCurDay(this.days);
  auPairChildren: string[] = [];
  activities: any;
  children : any;
  childActivity : any = {
    childName : "",
    childId : "",
    activityName : "",
    activityId : "",
    time : "",
    dayofweek : "",
  }
  childActivities : any[] = [];

  constructor(private serv: API, private modalCtrl : ModalController, private store: Store) {}

  async openModal(actId : string) {
    const modal = await this.modalCtrl.create({
      component: ScheduleModalComponent,
      componentProps :{
        activityId : actId
      }
    });
    await modal.present();
  }

  ngOnInit(): void {
      this.aupairID = this.store.snapshot().user.id;
      this.getActivities();
  }

  getCurDay(days : string[]) : number {
    const pipe = new DatePipe('en-US');
    const dateStr = pipe.transform(Date.now(),'EEEE');
    return days.findIndex(x => x === dateStr);
  }

  async getActivities(){
    console.log("getActivities");
    this.serv.getChildren(this.aupairID).subscribe(
      res => {
        this.children = res;
        this.children.forEach((element: { id: string; }) => {
          this.auPairChildren.push(element.id);
        });
        this.serv.getAuPairSchedule(this.auPairChildren).subscribe(
          res=>{
            this.activities = res;
            this.setChildActivity();
          }
        );
      },
      error => { console.log("Error has occured with API: " + error); },
    );
  }

  setChildActivity(){
    this.children.forEach((child: { id: any; fname: any; }) => {
      this.activities.forEach((act: { childId: any; child: any; name: any; id: any; timeStart: any; day: any; }) => {
        if(child.id === act.child){
          const childActivity = {
            childName : child.fname,
            childId : act.child,
            activityName : act.name,
            activityId : act.id,
            time : act.timeStart,
            dayofweek : act.day,
          }
          this.childActivities.push(childActivity);
        }
      });
    });
  }
}
