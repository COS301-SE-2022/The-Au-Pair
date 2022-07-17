import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { AuPair, Child, Parent, User } from '../../../../shared/interfaces/interfaces';
import { AuPairRatingModalComponent } from './au-pair-rating-modal/au-pair-rating-modal.component';
import { ModalController } from '@ionic/angular';

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
  }

  auPairDetails: AuPair = {
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

  constructor(private serv: API, private modalCtrl : ModalController){}

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
    this.getParentDetails()
  }

  async getParentDetails()
  {
    await this.serv.getParent("4561237814867").subscribe(
      res=>{
        this.parentDetails.id = res.id;       
        this.parentID = res.id;
        this.parentDetails.children = res.cildren;
        this.parentDetails.medID = res.medID;
        this.parentDetails.auPair = res.auPair;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
    await this.serv.getUser("7542108615984").subscribe(
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
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
    await this.serv.getAuPair("7542108615984").subscribe(
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

    this.getChildren()
  }

  async getChildren(){
    this.serv.getChildren("4561237814867").subscribe(
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

}
