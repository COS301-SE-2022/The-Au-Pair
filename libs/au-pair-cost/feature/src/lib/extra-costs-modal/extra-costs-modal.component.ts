import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-extra-costs-modal',
  templateUrl: './extra-costs-modal.component.html',
  styleUrls: ['./extra-costs-modal.component.scss'],
})
export class ExtraCostsModalComponent implements OnInit {
  auPairId = "";
  parentID = "";

  public navParams = new NavParams;
  public sending = false;
  
  constructor(private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController, private store: Store) {}

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
