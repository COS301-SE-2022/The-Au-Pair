import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { auPair } from '../../../../../shared/interfaces/interfaces';
import { API } from '../../../../../shared/api/api.service';

@Component({
  selector: 'the-au-pair-au-pair-rating-modal',
  templateUrl: './au-pair-rating-modal.component.html',
  styleUrls: ['./au-pair-rating-modal.component.scss'],
})
export class AuPairRatingModalComponent implements OnInit {

  public navParams = new NavParams;
  auPairId: string = this.navParams.get('auPairId');
  auPairRating! : number;

  currentAuPair: auPair = {
    id: "",
    rating: 0,
    onShift: false,
    employer: "",
    costIncurred: 0,
    distTraveled: 0,
    payRate: 0,
    bio: "",
    experience: "",
    currentLong: 0.0,
    currentLat: 0.0
  }
  
  constructor(private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController) {}

  ngOnInit(): void {
    this.getAuPair(this.auPairId);
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  getDescription(formData : any){
    this.getAuPairDetails()
    this.auPairRating = formData.behaviour;
    this.currentAuPair.rating = this.auPairRating;  
    this.submitRating();
  }

  async getAuPairDetails()
  {
    await this.serv.getAuPair("7542108615984").subscribe(
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
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  getAuPair(auPairId : string){
    this.serv.getAuPair("7542108615984").subscribe(
      res => { 
        this.currentAuPair = res;
      },
      error => { 
        console.log(error)
      }
    );
  }

  async openToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Au Pair rating added!',
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  submitRating(){
    this.serv.editAuPair(this.currentAuPair).subscribe(
      res=>{
        console.log("The response is:" + res);
        this.closeModal();
        this.openToast();
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    );
  }
}
