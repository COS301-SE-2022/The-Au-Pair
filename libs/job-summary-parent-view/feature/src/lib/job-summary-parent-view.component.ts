import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { DatePipe } from '@angular/common';
import { Child, Contract, Parent, User } from 'libs/shared/interfaces/interfaces';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'the-au-pair-job-summary-parent-view',
  templateUrl: './job-summary-parent-view.component.html',
  styleUrls: ['./job-summary-parent-view.component.scss'],
})
export class JobSummaryParentViewComponent implements OnInit {

/* eslint-disable @typescript-eslint/no-explicit-any */
  parentID = "";
  auPairID = "";
  childrenArr: Child[] = [];
  flag!: boolean;

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

  childDetails: Child ={
    id: "",
    fname: "",
    sname: "",
    allergies: "",
    diet: "",
    parent: "",
    aupair: "",
  }

  contractDetails: Contract= {
    parentID: "",
    auPairID: "",
    timestamp: "",
  }

  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
  }

  userDetails: User = {
    id: '',
    fname: '',
    sname: '',
    email: '',
    address: '',
    registered: false,
    type: 0,
    password: '',
    number: '',
    salt: '',
    latitude: 0,
    longitude: 0,
    suburb: "",
    gender: "",
    fcmToken : "",
    birth: "",
    warnings: 0,
    banned: "",
  }

  constructor(private serv: API, private store: Store, private router: Router, public toastCtrl: ToastController)
  {
    const navigation = this.router.getCurrentNavigation();
    if(navigation !== null)
      if(navigation.extras !== null)
      { 
        this.auPairID = navigation.extras.state?.['id'];
      }
  }

  async ngOnInit(): Promise<void> {
    console.log("This au pair ID is: ", this.auPairID);
    
    this.parentID = this.store.snapshot().user.id;
    this.getActivities();

    
    await this.serv.getUser(this.parentID).toPromise()
    .then( 
      res=>{
        this.userDetails.id = res.id;
        this.userDetails.fname = res.fname;
        this.userDetails.sname = res.sname;
        this.userDetails.email = res.email;
        this.userDetails.address = res.address;
        this.userDetails.number = res.number;
        this.userDetails.salt = res.salt;
        this.userDetails.latitude = res.latitude;
        this.userDetails.longitude = res.longitude;
        this.userDetails.suburb = res.suburb;
        this.userDetails.gender = res.gender;
        this.userDetails.birth = res.birth;
        this.userDetails.warnings = res.warnings;
        this.userDetails.banned = res.banned;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
    
    await this.serv.getParent(this.parentID)
    .toPromise()
      .then( 
        res=>{
          this.parentDetails.id = res.id;      
          this.parentID = res.id;
          this.parentDetails.children = res.children;
          this.parentDetails.medID = res.medID;
          this.parentDetails.auPair = res.auPair;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

    
    await this.serv.getChildren(this.parentID).subscribe(
        res=>{
          let i = 0;
          res.forEach((element: Child) => {
            this.childrenArr[i++] = element;
          });
        },
        error =>{console.log("Error has occured with API: " + error);}
      )
  }

  getCurDay(days : string[]) : number {
    const pipe = new DatePipe('en-US');
    const dateStr = pipe.transform(Date.now(),'EEEE');
    return days.findIndex(x => x === dateStr);
  }

  async getActivities(){
    console.log("getActivities");
    this.serv.getChildren(this.parentID).subscribe(
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

  async sendHireRequests()
  {
    this.flag = false;
    const ts = new Date();

    this.contractDetails.parentID = this.parentID;
    this.contractDetails.auPairID = this.auPairID;

    const minutes = String(ts.getMinutes()).padStart(2, '0');

    this.contractDetails.timestamp = ts.getFullYear() + "/" + (ts.getMonth() + 1) + "/" + ts.getDate() + " - " + ts.getHours() + ":" + minutes;

    await this.serv.getContractbyIDs(this.contractDetails.parentID, this.contractDetails.auPairID)
    .toPromise()
    .then(
      res => {
        console.log("The response is:" + res);
        
        if(res === null)
        {
          this.flag = false;
        }
        else
        {
          this.flag = true;
        }
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
    
    if(this.flag === false)
    {
      this.sucToast();
      this.serv.addContract(this.contractDetails)
      .toPromise()
      .then(
        res => {
          console.log("The response is:" + res);
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      )
    }
    else
    {
      this.errToast();
    }
    this.router.navigate(['/explore']);
  }

  async errToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'You have already requested to hire this Au Pair.',
      duration: 2000,
      position: 'top',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  async sucToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Request sent successfully!',
      duration: 2000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }
}