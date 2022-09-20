import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'the-au-pair-extra-costs-modal',
  templateUrl: './extra-costs-modal.component.html',
  styleUrls: ['./extra-costs-modal.component.scss'],
})
export class ExtraCostsModalComponent implements OnInit {
  auPairId = "";
  parentID = "";

  fuelPrices = {
    "diesel": 0,
    "petrol-95": 0,
    "petrol-93": 0,
  };

  public navParams = new NavParams;
  public sending = false;
  public costsForm: FormGroup;
  
  constructor(public formBuilder: FormBuilder, private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController, private store: Store, private http: HttpClient) {
    this.costsForm = formBuilder.group({
      type: ['Other'],
      desc: [''],
      hours: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ,\'-]+$'), Validators.required])],
      distance: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ,\'-]+$'), Validators.required])],
      fuelType: ['95-Unleaded'],
      amount : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ,\'-]+$'), Validators.required])],
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

    // this.getCurrentFuelPrice();
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  addCost() {
  
  }

  async getCurrentFuelPrice() {
    var key = "bf905c21ac3640dc940a76e586f67a10";
    this.fuelPrices = {
      "diesel": 0,
      "petrol-95": 0,
      "petrol-93": 0,
    }

    const headers = new HttpHeaders({
      'key':key
    });

    const httpOptions = {
      headers: new HttpHeaders({
        key
      })
    };
    

    const requestOptions = { headers: headers };

    await this.http.get('https://api.fuelsa.co.za/exapi/fuel/current', httpOptions)
    .toPromise()
    .then(data=>{ // Success
      //Populate potential Locations Array
      // const json_data = JSON.stringify(data);
      // const res = JSON.parse(json_data);

      // //Jump out if no results returned
      // if(json_data === "{}")
      // {
      //   return;
      // }
  
      // //Add returned data to the array
      // const len = res.length;
      // for (let j = 0; j < len && j<4; j++) 
      // { 
      //   if(loc == res[j].display_name) {
      //     this.locationError = false;
          
      //     this.long = res[j].lon;
      //     this.lat = res[j].lat;

      //     if(res[j].address.suburb != undefined && res[j].address.suburb != null) {
      //       this.foundSuburb =  res[j].address.suburb;
      //     }
      //     else if(res[j].address.town != undefined && res[j].address.town != null) {
      //       this.foundSuburb =  res[j].address.town;
      //     }
      //     else {
      //       this.foundSuburb = res[j].address.city;
      //     }

      //     break;
      //   }
      // }
      console.log(data);
    })
    .catch(error=>{ // Failure
      console.log(error);
    });
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
