import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { Child, Parent, User } from '../../../../shared/interfaces/interfaces';
import { AuPairRatingModalComponent } from './au-pair-rating-modal/au-pair-rating-modal.component';
import { ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

@Component({
  selector: 'the-au-pair-parent-dashboard',
  templateUrl: 'parent-dashboard.html',
  styleUrls: ['parent-dashboard.scss'],
})
export class ParentDashboardComponent implements OnInit{

  children: Child[] = [];
  parentID = "";

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
    birth: "",
  }

  auPairDetails: User = {
    id: "",
    fname: "",
    sname: "",
    email: "",
    address: "",
    registered: false,
    type: 0,
    password: "",
    number: "",
    salt: "",
    latitude: 0,
    longitude: 0,
    suburb: "",
    gender: "",
    birth: "",
  }

  constructor(private serv: API, private modalCtrl : ModalController, private store: Store, public toastCtrl: ToastController, public router: Router){}

  async openModal(actId : string) {
    const modal = await this.modalCtrl.create({
      component: AuPairRatingModalComponent,
      componentProps :{
        activityId : actId
      }
    });
    await modal.present();
  }

  async ngOnInit()
  {
    this.parentID = this.store.snapshot().user.id;

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

    if(this.parentDetails.auPair != "")
    {
      await this.serv.getUser(this.parentDetails.auPair)
      .toPromise()
      .then(
        res => {
          this.auPairDetails.id = res.id;
          this.auPairDetails.fname = res.fname;
          this.auPairDetails.sname = res.sname;
          this.auPairDetails.email = res.email;
          this.auPairDetails.address = res.address;
          this.auPairDetails.number = res.number;
        },
        error => { 
          console.log("Error has occured with API: " + error);
        }
      )
    }

    this.getChildren();
  }

  async getChildren(){
    this.serv.getChildren(this.parentID).subscribe(
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
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  async checkHasChildren(){
    if (this.parentDetails.children.length >= 1){
      this.router.navigate(['/add-activity']);
    }
    else
    {
      this.openToast('You have no children to assign activities to');
    }
  }

  async checkHasEmployer(){
    if (this.parentDetails.auPair !== ""){
      this.router.navigate(['/au-pair-cost']);
    }
    else
    {
      this.openToast('No Au Pair employed');
    }
  }
}
