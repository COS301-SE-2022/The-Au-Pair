import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { auPair, Child, Parent, User } from '../../../../../shared/interfaces/interfaces';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

@Component({
  selector: 'the-au-pair-job-summary-modal',
  templateUrl: './job-summary-modal.component.html',
  styleUrls: ['./job-summary-modal.component.scss'],
})
export class JobSummaryModalComponent implements OnInit {
  public navParams = new NavParams;
  parentID: string = this.navParams.get('parentID');
  contractID: string = this.navParams.get('contractID');
  auPairID = "";
  childrenArr: Child[] = [];

  days = [
    "Mon","Tue","Wed","Thu","Fri","Sat","Sun"
  ];

  shiftHours: number[] = [];
  shiftRangeMin: string[] = [];
  shiftRangeMax: string[] = [];

  auPairChildren: string[] = [];

  currentAuPair: auPair = {
    id: "",
    rating: [],
    onShift: false,
    employer: "",
    costIncurred: 0,
    distTraveled: 0,
    payRate: 0,
    bio: "",
    experience: "",
    currentLong: 0.0,
    currentLat: 0.0,
    terminateDate: "",
  }

  childDetails: Child ={
    id: "",
    fname: "",
    sname: "",
    allergies: "",
    diet: "",
    parent: "",
    aupair: "",
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

  activities: any;

  constructor(private serv: API, private modalCtrl : ModalController, private store: Store, private router: Router, public toastCtrl: ToastController) {}

  async ngOnInit(): Promise<void> {
    this.auPairID = this.store.snapshot().user.id;

    await this.serv.getParent(this.parentID)
    .toPromise()
      .then( 
        res=>{
          this.parentDetails.id = res.id;      
          this.parentDetails.children = res.children;
          this.parentDetails.medID = res.medID;
          this.parentDetails.auPair = res.auPair;
          this.parentDetails.rating = res.rating;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

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
    
    await this.serv.getChildren(this.parentID).subscribe(
        res=>{
          let i = 0;
          res.forEach((element: Child) => {
            this.childrenArr[i++] = element;
          });
        },
        error =>{console.log("Error has occured with API: " + error);}
      )

    this.populateGraph();
  }

  async sucToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Request has been accepted!',
      duration: 1000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  async acceptRequest()
  {
    this.sucToast();    

    await this.getAuPairDetails();
    await this.getParentDetails(this.parentID);
    await this.addChildrenAuPair(this.parentID);

    this.currentAuPair.employer = this.parentID;
    this.parentDetails.auPair = this.auPairID;    

    await this.updateAuPair();
    await this.updateParent();

    this.serv.removeContract(this.contractID).subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['/au-pair-dashboard']).then(()=>{
        window.location.reload();
        });
      },
      error=>{console.log("Error has occured with API: " + error);}
    )

    this.closeModal();
  }

  async rejectRequest()
  {
    await this.serv.removeContract(this.contractID).subscribe(
      res=>{
        console.log(res);
        location.reload();
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  async getAuPairDetails()
  {
    await this.serv.getAuPair(this.auPairID)
    .toPromise()
      .then(
      res=>{
        this.currentAuPair.id = res.id;
        this.currentAuPair.rating = res.rating;
        this.currentAuPair.onShift = res.onShift;
        this.currentAuPair.employer = res.employer;
        this.currentAuPair.costIncurred = res.costIncurred;
        this.currentAuPair.distTraveled = res.distTraveled;
        this.currentAuPair.payRate = res.payRate;
        this.currentAuPair.bio = res.bio;
        this.currentAuPair.experience = res.experience;
        this.currentAuPair.currentLong = res.currentLong;
        this.currentAuPair.currentLat = res.currentLat;
        this.currentAuPair.terminateDate = res.terminateDate;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  async getParentDetails(parentID : string)
  {
    await this.serv.getParent(parentID)
    .toPromise()
      .then( 
        res=>{
          this.parentDetails.id = res.id;      
          this.parentDetails.children = res.children;
          this.parentDetails.medID = res.medID;
          this.parentDetails.auPair = res.auPair;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
  }

  async addChildrenAuPair(parent : string)
  {
     await this.serv.getChildren(parent)
     .toPromise()
     .then(
       res=>{        
         for(let i = 0; i < res.length; i++)
         {
           this.childDetails.id = res[i].id;
           this.childDetails.fname = res[i].fname;
           this.childDetails.sname = res[i].sname;
           this.childDetails.allergies = res[i].allergies;
           this.childDetails.diet = res[i].diet;
           this.childDetails.parent = res[i].parent;
           this.childDetails.aupair = this.auPairID;
 
           this.updateChild(this.childDetails);
         }
       },
       error => {
         console.log("Error has occured with API: " + error);
       }
     ) 
  }

  async updateAuPair(){
    await this.serv.editAuPair(this.currentAuPair).toPromise()
    .then(
      res=>{
        console.log("The response is:" + res);
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    );
  }

  async updateParent(){
    await this.serv.editParent(this.parentDetails).toPromise()
    .then(
      res=>{
        console.log("The response is:" + res);
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    );
  }

  async updateChild(child : Child){
    await this.serv.updateChild(child).toPromise()
    .then(
      res=>{
        console.log("The response is:" + res);
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    )
  }

  async populateGraph()
  {   
    let actCount = 0;
    let minTime = "23:59";
    let maxTime = "00:00";

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
      minTime = "23:59";
      maxTime = "00:00";

      this.activities.forEach((act: {timeStart: any; day: any; timeEnd: any;}) => 
      {
        if(act.day === actDays[i])
        {
          actCount++;
          
          if(act.timeStart <= minTime)
          {
            minTime = act.timeStart;
          }

          if(act.timeEnd >= maxTime)
          {
            maxTime = act.timeEnd;
          }
        }
      });
      this.shiftHours[i] = actCount;
      this.shiftRangeMin[i] = minTime;
      this.shiftRangeMax[i] = maxTime;
    }    
  }

  closeModal()
  {
    this.modalCtrl.dismiss();
  }
}
