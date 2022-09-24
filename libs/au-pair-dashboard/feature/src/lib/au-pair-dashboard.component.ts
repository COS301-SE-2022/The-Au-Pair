import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { API } from '../../../../shared/api/api.service'
import { auPair, Child, HoursLogged, Parent } from '../../../../shared/interfaces/interfaces';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserReportModalComponent } from './user-report-modal/user-report-modal.component';
import { ParentRatingModalComponent } from './parent-rating-modal/parent-rating-modal.component';

@Component({
  selector: 'the-au-pair-au-pair-dashboard',
  templateUrl: './au-pair-dashboard.component.html',
  styleUrls: ['./au-pair-dashboard.component.scss'],
  providers: [API]
})
export class AuPairDashboardComponent implements OnInit {
  
  aupairID = "";
  aupairName = "";

  employer = "";
  employerName!: string;
  employerSurname! : string;
  employerId = '';
  employerPhone! : string;
  children: Child[] = [];

  alreadyLogging = false;
  logID = "";

  hoursLogDetail: HoursLogged = {
    id: "",
    user: "",
    date: "",
    timeStart: "",
    timeEnd: ""
  };

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
    dob: "",
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
  
  constructor(private serv: API, private modalCtrl : ModalController, private store: Store, public router: Router, public toastCtrl: ToastController, private alertController: AlertController) {}

  async openReportModal() {
    const modal = await this.modalCtrl.create({
      component: UserReportModalComponent
    });
    await modal.present();
  }

  async ngOnInit(): Promise<void> {
    this.aupairID = this.store.snapshot().user.id;
    this.aupairName = this.store.snapshot().user.name;

    await this.getEmployer();
    await this.getAuPairDetails();

    if(this.currentAuPair.terminateDate != '')
    {
      await this.checkResignation();
    }

    const todaysDate = this.getToday();
    this.serv.getStartedLog(this.aupairID, todaysDate).subscribe( 
      data => {
        if(data == null || data == "") {
          this.alreadyLogging = false;
        }
        else{
          this.logID = data;
          this.alreadyLogging = true;
        }
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
  }

  async openModal(parentId : string) {
    const modal = await this.modalCtrl.create({
      component: ParentRatingModalComponent,
      componentProps :{
        parentId : parentId
      }
    });
    await modal.present();
  }

  logSwitch() {
    if(this.alreadyLogging) {
      if(this.logID == null || this.logID == "") {
        this.serv.getStartedLog(this.aupairID, this.getToday()).subscribe( 
          data => {
            this.logID = data;
          },
          error => {
            console.log("Error has occured with API: " + error);
          }
        )
      }

      this.serv.addTimeEnd(this.logID, this.getCurrentTime()).subscribe( 
        data => {
          this.alreadyLogging = !this.alreadyLogging;
          console.log("The response is:" + data); 
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      )
    }
    else {
      this.hoursLogDetail.user = this.aupairID;
      this.hoursLogDetail.date = this.getToday();
      this.hoursLogDetail.timeStart = this.getCurrentTime();
      this.serv.addHoursLog(this.hoursLogDetail).subscribe( 
        res=>{
          this.alreadyLogging = !this.alreadyLogging;
          console.log("The response is:" + res); 
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      )
    }
  }

  getToday() {
    const now = new Date();
    now.setMonth(now.getMonth()+1);

    const strDate = ('0' + now.getDate()).slice(-2) + "/" + ('0' + now.getMonth()).slice(-2) +
    "/" + now.getFullYear();

    return strDate;
  }

  getCurrentTime() {
    const now = new Date();

    const strTime = ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2);

    return strTime;
  }

  async getEmployer(){
    await this.serv.getAuPair(this.aupairID)
    .toPromise()
    .then(
      res => {
        this.employer = res.employer;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

    if(this.employer != "")
    {
       this.serv.getUser(this.employer).subscribe(
      res=>{
          this.employerName = res.fname;
          this.employerSurname = res.sname;
          this.employerId = res.id;
          this.employerPhone = res.number;
          this.getChildren();
      },
      error=>{console.log("Error has occured with API: " + error);}
      )
    }
   
  }

  async getChildren(){
    this.serv.getChildren(this.employerId).subscribe(
      res=>{
        let i = 0;
        res.forEach((element: Child) => {
          this.children[i++] = element;
          
        });
      },
      error =>{console.log("Error has occured with API: " + error);}
      
    )
  }

  async openToast(message: string)
  {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  async checkHasEmployerEmployedSchedule(){
    if (this.employerId !== ''){
      this.router.navigate(['/au-pair-schedule']);
    }
    else
    {
      this.openToast('You need to be employed to view your schedule');
    }
  }

  async checkHasEmployerEmployedRequests(){
    if (this.employerId === ''){
      this.router.navigate(['/hire-requests']);
    }
    else
    {
      this.openToast('You are already employed');
    }
  }

  async checkHasEmployerSummary(){
    if (this.employerId !== ''){
      this.router.navigate(['/job-summary-au-pair-view']);
    }
    else
    {
      this.openToast('You need to be employed to view your job summary');
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to resign? (You will still be employed for 2 weeks or until the parent terminates the contract)',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => { this.resign(); }
        }
      ]
    });

    await alert.present();
  }

  async resign()
  {
    await this.getAuPairDetails();

    const ts = new Date();


    const td = ts.getFullYear() + "-" + (ts.getMonth() + 1) + "-" + ts.getDate();    

    this.currentAuPair.terminateDate = td;

    await this.updateAuPair();
  }

  async getAuPairDetails()
  {
    await this.serv.getAuPair(this.aupairID)
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

  async checkResignation()
  {
    await this.getAuPairDetails();   
        
    const then  = new Date(this.currentAuPair.terminateDate);
    const now = new Date();

    const msBetweenDates = Math.abs(then.getTime() - now.getTime());

    let daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

    daysBetweenDates = Math.ceil(daysBetweenDates);    

    if(daysBetweenDates >= 14)
    {
      this.terminateAuPair();
    }
  }

  async terminateAuPair()
  {
    await this.getAuPairDetails();
    await this.getParentDetails();
    await this.removeChildrenAuPair();

    this.currentAuPair.terminateDate = "";
    this.currentAuPair.employer = "";
    this.parentDetails.auPair = "";

    await this.updateAuPair();
    await this.updateParent();

    location.reload();
  }

  async getParentDetails()
  {
    await this.serv.getParent(this.currentAuPair.employer)
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
  }

 async removeChildrenAuPair()
 {
    await this.serv.getChildren(this.currentAuPair.employer)
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
          this.childDetails.dob = res[i].dob;
          this.childDetails.aupair = "";

          this.updateChild(this.childDetails);
        }
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    ) 
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
}
