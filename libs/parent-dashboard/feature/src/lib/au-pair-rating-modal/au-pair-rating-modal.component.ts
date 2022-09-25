import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { auPair } from '../../../../../shared/interfaces/interfaces';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-au-pair-rating-modal',
  templateUrl: './au-pair-rating-modal.component.html',
  styleUrls: ['./au-pair-rating-modal.component.scss'],
})
export class AuPairRatingModalComponent implements OnInit {
  public navParams = new NavParams;
  auPairId: string = this.navParams.get('auPairId');

  parentID = "";
  auPairRating! : number;

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
    alreadyOutOfBounds: false,
    terminateDate: "",
  }
  
  constructor(private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController, private store: Store) {}

  async ngOnInit() {
    this.parentID = this.store.snapshot().user.id;
    this.getAuPairDetails();
  }

  async getAuPairDetails()
  {
    await this.serv.getAuPair(this.auPairId).subscribe(
      res=>{
        this.currentAuPair = res;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  async getDescription(formData : any){
    await this.getAuPairDetails();

    if(formData.behaviour > 5 || formData.behaviour < 1 || isNaN(+formData.behaviour))
    {
      this.auPairRating = 1;
    }
    else
    {
      this.auPairRating = formData.behaviour;
    }
    
    this.currentAuPair.rating.push(this.auPairRating);  
    this.submitRating();
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

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
