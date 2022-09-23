import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCosts } from 'libs/shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-extra-costs-modal',
  templateUrl: './extra-costs-modal.component.html',
  styleUrls: ['./extra-costs-modal.component.scss'],
})
export class ExtraCostsModalComponent implements OnInit {
  auPairId = "";
  parentID = "";

  fuelPrices = {
    "diesel": 24.15,
    "petrol-95": 23.38,
    "petrol-93": 22.95, 
  };

  costDetails: UserCosts ={
    id: '',
    type: '',
    description: '',
    contributerId: '',
    otherPartyId: '',
    date: '',
    metric: 0,
    amount: 0,
  }

  public navParams = new NavParams;
  public sending = false;
  public costsForm: FormGroup;
  public amountEditable = true;
  
  constructor(public formBuilder: FormBuilder, private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController, private store: Store) {
    this.costsForm = formBuilder.group({
      type: ['Other'],
      desc: ['', Validators.compose([Validators.maxLength(30)])],
      hours: ['', Validators.compose([Validators.maxLength(3)])],
      distance: ['', Validators.compose([Validators.maxLength(15)])],
      kml: ['', Validators.compose([Validators.maxLength(15)])],
      fuelType: ['95-Unleaded'],
      amount : [''],
    });

    this.costsForm.valueChanges.subscribe(() => {
      if(this.costsForm.value.type == 'Fuel') {
        // this.costsForm.controls['amount'].disable();
        this.amountEditable = false;
      }
      else {
        // this.costsForm.controls['amount'].enable();
        this.amountEditable = true;
      }

      if(this.costsForm.value.type == 'Fuel' && !(isNaN(parseFloat(this.costsForm.value.distance)) || this.costsForm.value.distance == "" || !this.costsForm.controls['distance'].valid) && !(isNaN(parseFloat(this.costsForm.value.kml)) || this.costsForm.value.kml == "" || !this.costsForm.controls['kml'].valid)) {
        var fuelPrice = 0;
        switch(this.costsForm.value.fuelType) {
          case '95-Unleaded':
            fuelPrice = this.fuelPrices['petrol-95'];
          break;

          case '93-Unleaded':
            fuelPrice = this.fuelPrices['petrol-93'];
          break;

          case 'Diesel':
            fuelPrice = this.fuelPrices['diesel'];
          break;
        }

        var newAmount = (parseFloat(this.costsForm.value.distance) / parseFloat(this.costsForm.value.kml)) * fuelPrice;

        this.costsForm.controls['amount'].setValue(newAmount);
      }
    });
  }

  async ngOnInit() {
    this.auPairId = this.store.snapshot().user.id;
    await this.serv.getAuPair(this.auPairId)
    .toPromise()
      .then( 
        res=>{
          this.parentID = res.employer;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

    this.getCurrentFuelPrice();
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  sendCostData(type: string, desc: string, metric: number, amount: number) {
    this.costDetails.type = type;
    this.costDetails.description = desc;
    this.costDetails.contributerId = this.auPairId;
    this.costDetails.otherPartyId = this.parentID;
    this.costDetails.date = new Date().toISOString();
    this.costDetails.metric = metric;
    this.costDetails.amount = amount;

    this.serv.addUserCost(this.costDetails)
    .toPromise()
      .then( 
        res=>{
          console.log(res);
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

    this.costDetails.type = '';
    this.costDetails.description = '';
    this.costDetails.contributerId = '';
    this.costDetails.otherPartyId = '';
    this.costDetails.date = '';
    this.costDetails.metric = 0;
    this.costDetails.amount = 0;
  }

  addCost() {
    this.sending = true;

    let descError = document.getElementById("descriptionError");
    let distError = document.getElementById("distanceError");
    let kmlError = document.getElementById("kmlError");
    let hoursError = document.getElementById("hoursError");
    let amountError = document.getElementById("amountError");

    if(this.costsForm.value.type != 'Fuel' && this.costsForm.value.desc == "" )
    {
      if(descError != null)
      {
        descError.style.display = "block";
        this.sending = false;
        return;
      }
    }
    else
    {
      if(descError != null)
      {
        descError.style.display = "none";
      }
    }

    if(this.costsForm.value.type == 'Fuel' && (isNaN(parseFloat(this.costsForm.value.distance)) || this.costsForm.value.distance == "" || !this.costsForm.controls['distance'].valid)) {
      if(distError != null)
      {
        distError.style.display = "block";
        this.sending = false;
        return;
      }
    }
    else if(this.costsForm.value.type == 'Fuel' && (isNaN(parseFloat(this.costsForm.value.kml)) || this.costsForm.value.kml == "" || !this.costsForm.controls['kml'].valid)) {
      if(distError != null)
      {
        distError.style.display = "block";
        this.sending = false;
        return;
      }
    }
    else {
      if(distError != null)
      {
        distError.style.display = "none";
      }

      // this.sendCostData(this.costsForm.value.type, this.costsForm.value.desc, parseFloat(this.costsForm.value.distance), );
    }

    if(this.costsForm.value.type == 'Overtime' && (isNaN(parseFloat(this.costsForm.value.hours)) || this.costsForm.value.hours == "" || !this.costsForm.controls['hours'].valid)) {
      if(hoursError != null)
      {
        hoursError.style.display = "block";
        this.sending = false;
        return;
      }
    }
    else
    {
      if(hoursError != null)
      {
        hoursError.style.display = "none";
      }

          // this.sendCostData(this.costsForm.value.type, this.costsForm.value.desc, parseFloat(this.costsForm.value.hours), );
    }

    if(this.costsForm.value.type == 'Other' && (isNaN(parseFloat(this.costsForm.value.amount)) || this.costsForm.value.amount == "" || !this.costsForm.controls['amount'].valid)) {
      if(amountError != null)
      {
        amountError.style.display = "block";
        this.sending = false;
        return;
      }
    }
    else
    {
      if(amountError != null)
      {
        amountError.style.display = "none";
      }
          // this.sendCostData(this.costsForm.value.type, this.costsForm.value.desc, 0, amountError);
    }

    this.sending = false;
  }

  async getCurrentFuelPrice() {
    this.fuelPrices = {
      "diesel": 0,
      "petrol-95": 0,
      "petrol-93": 0, 
    }

    await this.serv.getCurrentFuelPrices()
    .toPromise()
      .then( 
        res=>{
          console.log(res);

          this.fuelPrices['diesel'] = (res.diesel[0].value)/100;
          this.fuelPrices['petrol-95'] = (res.petrol[0].value)/100;
          this.fuelPrices['petrol-93'] = (res.petrol[1].value)/100;
      },
      error => {
        // Default values
        this.fuelPrices = {
          "diesel": 24.15,
          "petrol-95": 23.38,
          "petrol-93": 22.95, 
        }
      }
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
}
