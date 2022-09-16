import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { auPair, Contract, User } from '../../../../../shared/interfaces/interfaces';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { min } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'the-au-pair-expand-modal',
  templateUrl: './expand-modal.component.html',
  styleUrls: ['./expand-modal.component.scss'],
})
export class ExpandModalComponent implements OnInit {
  public navParams = new NavParams;
  auPairId: string = this.navParams.get('auPairId');

  parentID = "";

  flag!: boolean;

  auPairDetails: auPair = {
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
    latitude: 0,
    longitude: 0,
    suburb: "",
    gender: "",
    fcmToken : "",
    birth: "",
    warnings: 0,
    banned: "",
  }

  contractDetails: Contract= {
    parentID: "",
    auPairID: "",
    timestamp: "",
  }
  
  constructor(private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController, private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.parentID = this.store.snapshot().user.id;
    this.getAuPairDetails(this.auPairId);
  }

  closeModal(){
    this.modalCtrl.dismiss();
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

  async getAuPairDetails(APID : string)
  {
      await this.serv.getUser(APID).subscribe(
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
          this.userDetails.latitude = res.latitude;
          this.userDetails.longitude = res.longitude;
          this.userDetails.suburb = res.suburb;
          this.userDetails.gender = res.gender;
          this.userDetails.birth = res.birth;
          this.userDetails.warnings = res.warnings;
          this.userDetails.banned = res.banned;
        },
      error=>{console.log("Error has occured with API: " + error);}
      )
      await this.serv.getAuPair(APID).subscribe(
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
          this.auPairDetails.currentLat = res.currentLat;
          this.auPairDetails.currentLong = res.currentLong;
          this.auPairDetails.terminateDate = res.terminateDate;
        },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  async sendHireRequests(auPairID : string)
  {
    this.flag = false;

    this.contractDetails.parentID = this.parentID;
    this.contractDetails.auPairID = auPairID;

    await this.serv.getContractbyIDs(this.contractDetails.parentID, this.contractDetails.auPairID)
    .toPromise()
    .then(
      res => {
        console.log("The response is:" + res);
        
        if(res === null)
        {
          this.router.navigate(['/job-summary-parent-view'],{
            state: {id: auPairID}
          });
        }
        else
        {
          this.errToast();
        }
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

    this.closeModal();
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

  getAverage(ratings : number[])
  {
    let total = 0;
    for(let i = 0; i < ratings.length; i++)
    {
      total += ratings[i];
    }

    let avg = total/ratings.length;

    var ret = (Math.round(avg * 100) / 100).toFixed(1);

    return ret;
  }
}
