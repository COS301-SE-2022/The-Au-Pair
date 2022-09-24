import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { DatePipe } from '@angular/common';
import { Child, Contract, Email, Parent, User } from '../../../../shared/interfaces/interfaces';
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

  shiftHours: number[] = [];

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
    dob: "",
    allergies: "",
    diet: "",
    parent: "",
    aupair: ''
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
    rating: []
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

  emailRequest: Email ={
    to: "",
    subject: "",
    body: "",
  }

  auPairEmail = "";

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
    this.parentID = this.store.snapshot().user.id;

    await this.getActivities();
    await this.getUserDetails();
    await this.getParentDetails();
    await this.getChildrenDetails();
    this.getNoActivities();
  }

  async getActivities(){
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

  async getUserDetails()
  {
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
  }

  async getParentDetails()
  {
    await this.serv.getParent(this.parentID)
    .toPromise()
      .then( 
        res=>{
          this.parentDetails.id = res.id;      
          this.parentID = res.id;
          this.parentDetails.children = res.children;
          this.parentDetails.medID = res.medID;
          this.parentDetails.auPair = res.auPair;
          this.parentDetails.rating = res.rating;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
  }

  async getChildrenDetails()
  {
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
    if(this.auPairID == "")
    {
      this.router.navigate(['/explore']);
    }

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
      this.createToast('Request sent successfully!');
      this.serv.addContract(this.contractDetails)
      .toPromise()
      .then(
        res => {
            //get au pair by id
            this.serv.getUser(this.auPairID).toPromise().then(
              res => {
                this.auPairEmail = res.email;
                this.emailRequest.to = this.auPairEmail;
                this.emailRequest.subject = "New hire request received";
                this.emailRequest.body = "You have received a new hire request from " + this.userDetails.fname + " " + this.userDetails.sname + ". Please log into the app to view the request." +
                                         "\n\nRegards,\nThe Au Pair Team";
                this.serv.sendEmail(this.emailRequest).toPromise().then(
                  res => {
                    console.log(res);
                  },
                  error => {
                    console.log("Error has occured with API: " + error);
                  });
              },
              error => {
                console.log("Error has occured with API: " + error);
              });
          console.log(res);
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      )
    }
    else
    {
      this.createToast('You have already requested to hire this Au Pair.');
    }
    this.router.navigate(['/explore']);
  }

  async createToast(message : string)
  {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  async getNoActivities()
  {   
    let actCount = 0;

    const actDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    await this.serv.getAuPairSchedule(this.parentDetails.children).toPromise()
    .then(
      res=>{
        this.activities = res;      
      },
      error=>{
        console.log("Error has occured with API: " + error);
      }
    )

    for(let i = 0; i < actDays.length; i++)
    {
      actCount = 0;

      this.activities.forEach((act: {timeStart: any; day: any; timeEnd: any;}) => 
      {
        if(act.day === actDays[i])
        {
          actCount++;
        }
      });
      this.shiftHours[i] = actCount;
    }    
  }

  getAverage(ratings : number[])
  {
    let total = 0;
    for(let i = 0; i < ratings.length; i++)
    {
      total += ratings[i];
    }

    const avg = total/ratings.length;

    if(avg < 1 || avg > 5)
    {
      return 0;
    }

    if((avg % 1) == 0)
    {
      return avg;
    }

    const ret = (Math.round(avg * 100) / 100).toFixed(1);

    return ret;
  }

  getCurDay(days : string[]) : number {
    const pipe = new DatePipe('en-US');
    const dateStr = pipe.transform(Date.now(),'EEEE');
    return days.findIndex(x => x === dateStr);
  }

  getAge(dateString : string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
  }
}
