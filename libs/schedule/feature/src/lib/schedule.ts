import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { API } from '../../../../shared/api/api.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Activity } from '../../../../shared/interfaces/interfaces';
import { NgModel } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { SetCurrentActivity } from '../../../../shared/ngxs/actions';

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

  constructor(private serv: API, private router: Router, private store: Store, private alertController: AlertController, public toastCtrl: ToastController) {}

  ngOnInit(): void {
      this.parentID = this.store.snapshot().user.id;
      this.getParentChildren();
  }

  getSelectedChild(){
    this.children.forEach(element => {
      if(element.name == this.selectedChildName){
        this.selectedChild.name = element.name;
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
      this.selectedChildName = this.children[0].name;
      this.getActivities(this.children[0].id);
      this.selectedChild.name = this.children[0].name;
      this.selectedChild.id = this.children[0].id;
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

  //Clear schedule for child
  //Alert to confirm clearing childs schedule
  async presentAlert(childName: string, childId: string) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to clear ' + childName + '\'s schedule? This will permanently delete all associated activities.',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => { this.removeAllActivities(); }
        }
      ]
    });

    await alert.present();
  }

  //Clearing the schedule for the child.
  async removeAllActivities()
  {
    await this.serv.removeManyActivities(this.activities).toPromise().then(
      res=>{
        console.log("The response is: ", res);
        location.reload();
        return res;
      }).catch(
      error=>{
        console.log("Error has occured with API: ", error);
        return error;
      }
    )
  }


  //Navigation methods

  navigateEdit(id : string)
  { 
    //Setting the current activity in the store so can refrsh while editing
    this.store.dispatch(new SetCurrentActivity(id));

    //Route to the edit-activity page and parse the ActivityID of the selected Activity 
    this.router.navigate(['/edit-activity']).then(()=>{
      location.reload();
    });
  }

  navigateViewActivity(id : string)
  { 
    //Setting the current activity in the store so can refrsh while editing
    this.store.dispatch(new SetCurrentActivity(id));

    //Route to the edit-activity page and parse the ActivityID of the selected Activity 
    this.router.navigate(['/view-activity']).then(()=>{
      location.reload();
    });
  }
}

