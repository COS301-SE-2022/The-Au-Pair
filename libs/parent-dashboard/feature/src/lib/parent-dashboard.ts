import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { auPair, Child, Parent, User } from '../../../../shared/interfaces/interfaces';
import { AuPairRatingModalComponent } from './au-pair-rating-modal/au-pair-rating-modal.component';
import { ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AppState, AppStateModel } from 'libs/shared/ngxs/state';
import { Navigate } from 'libs/shared/ngxs/actions';

@Component({
  selector: 'the-au-pair-parent-dashboard',
  templateUrl: 'parent-dashboard.html',
  styleUrls: ['parent-dashboard.scss'],
})
export class ParentDashboardComponent implements OnInit{

  children: any[] = [];
  parentID = "";

  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
  }

  childDetails: Child = {
    id: "",
    fname: "",
    sname: "",
    allergies: "",
    diet: "",
    parent: "",
  }

  userDetails: User = {
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
  }

  auPairDetails: auPair = {
    id: "",
    rating: 0,
    onShift: false,
    employer: "",
    costIncurred: 0,
    distTraveled: 0,
    payRate: 0,
    bio: "",
    experience: "",
  }

  constructor(private serv: API, private modalCtrl : ModalController, public store : Store, public toastCtrl : ToastController){}

  async openModal(actId : string) {
    const modal = await this.modalCtrl.create({
      component: AuPairRatingModalComponent,
      componentProps :{
        activityId : actId
      }
    });
    await modal.present();
  }

  ngOnInit(): void
  {
    this.parentID = this.store.snapshot().user.id;
    this.getParentDetails()
  }

  async getParentDetails()
  {
    await this.serv.getParent(this.parentID).subscribe(
      res=>{
        this.parentDetails.id = res.id;       
        this.parentID = res.id;
        this.parentDetails.children = res.cildren;
        this.parentDetails.medID = res.medID;
        this.parentDetails.auPair = res.auPair;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
    if(this.parentDetails.auPair != "")
    {
      await this.serv.getUser(this.parentID).subscribe(
        res=>{
          this.userDetails.id = res.id;
          this.userDetails.fname = res.fname;
          this.userDetails.sname = res.sname;
          this.userDetails.email = res.email;
          this.userDetails.address = res.address;
          this.userDetails.registered = res.registered;
          this.userDetails.type = res.type;
          this.userDetails.password = res.password;
          this.userDetails.number = res.number;
          this.userDetails.salt = res.salt;
        },
        error=>{console.log("Error has occured with API: " + error);}
      )

      await this.serv.getAuPair(this.parentDetails.auPair).subscribe(
        res=>{
          this.auPairDetails.id = res.id;
          this.auPairDetails.rating = res.rating;
          this.auPairDetails.onShift = res.onShift;
          this.auPairDetails.employer = res.employer;
          this.auPairDetails.costIncurred = res.costIncurred;
          this.auPairDetails.distTraveled = res.distTraveled;
          this.auPairDetails.payRate = res.payRate;
          this.auPairDetails.bio = res.bio;
          this.auPairDetails.experience = res.experience;
        },
        error=>{console.log("Error has occured with API: " + error);}
      )
    }
    if(this.parentDetails.children.length > 0)
    {
      this.getChildren()
    }
  }

  async getChildren(){
    this.serv.getChildren(this.parentID).subscribe(
      res=>{
        let i = 0;
        res.forEach((element: string) => {
          this.children[i++] = element;
        });
        console.log(this.children);
        
      },
      error =>{console.log("Error has occured with API: " + error);}
    )
  }

  nav(path: string) 
  {
    this.store.dispatch(new Navigate(path));
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
}
