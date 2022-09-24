import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { FormBuilder, FormControl } from '@angular/forms';
import { auPair } from 'libs/shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-edit-rate-modal',
  templateUrl: './edit-rate-modal.component.html',
  styleUrls: ['./edit-rate-modal.component.scss'],
})
export class EditRateModalComponent implements OnInit {
  auPairId = "";
  parentID = "";
  payRate = 0;
  type = -1;

  fuelPrices = {
    "diesel": 24.15,
    "petrol-95": 23.38,
    "petrol-93": 22.95, 
  };

  AuPair: auPair = {
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

  public navParams = new NavParams;
  public sending = false;
  public payRateInput = new FormControl('');
  
  constructor(public formBuilder: FormBuilder, private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController, private store: Store) {
  }

  async ngOnInit() {
    this.auPairId = this.store.snapshot().user.id;

    await this.serv.getAuPair(this.auPairId)
    .toPromise()
      .then( 
        res=>{
          this.AuPair.id = res.id;
          this.AuPair.rating = res.rating;
          this.AuPair.onShift = res.onShift;
          this.AuPair.employer = res.employer;
          this.AuPair.costIncurred = res.costIncurred;
          this.AuPair.distTraveled = res.distTraveled;
          this.AuPair.payRate = res.payRate;
          this.AuPair.bio = res.bio;
          this.AuPair.experience = res.experience;
          this.AuPair.currentLong = res.currentLong;
          this.AuPair.currentLat = res.currentLat;
          this.AuPair.terminateDate = res.terminateDate;

          this.payRateInput.setValue(this.AuPair.payRate);
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
  }

  updateRate(){
    this.sending = true;

    let payError = document.getElementById("payRateError");

    if(isNaN(parseFloat(this.payRateInput.value)) || this.payRateInput.value == "") {
      if(payError != null)
      {
        payError.style.display = "block";
        this.sending = false;
        return;
      }
    }
    else
    {
      if(payError != null)
      {
        payError.style.display = "none";
      }
    }

    this.AuPair.payRate = this.payRateInput.value;
    this.serv.editAuPair(this.AuPair)
    .toPromise()
      .then( 
        res=>{
          this.payRate = res.payRate;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

    this.sending = false;
    this.openToast("Pay Rate Updated");
    this.closeModal();
  }

  closeModal(){
    this.modalCtrl.dismiss();
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
