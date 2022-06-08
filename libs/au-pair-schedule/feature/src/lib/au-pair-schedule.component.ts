import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { ScheduleModalComponent } from './schedule-modal/schedule-modal.component';

@Component({
  selector: 'the-au-pair-au-pair-schedule',
  templateUrl: './au-pair-schedule.component.html',
  styleUrls: ['./au-pair-schedule.component.scss'],
})
export class AuPairScheduleComponent implements OnInit {
  days = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ]

  curDay =  this.getCurDay(this.days);
  activities: any;

  constructor(private serv: API, private modalCtrl : ModalController) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ScheduleModalComponent,
    });
     
    await modal.present();
  }

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
    this.serv.getSchedule("8675945310542").subscribe(
      res=>{
          this.activities = res;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }
}
