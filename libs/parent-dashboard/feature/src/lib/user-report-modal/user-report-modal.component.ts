import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Report } from '../../../../../shared/interfaces/interfaces';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-user-report-modal',
  templateUrl: './user-report-modal.component.html',
  styleUrls: ['./user-report-modal.component.scss'],
})
export class UserReportModalComponent implements OnInit {
  parentID = "";
  auPairId = "";

    reportDetails: Report = {
    id: "",
    issuerId: "",
    auPairId: "",
    desc: ""
  }

  public navParams = new NavParams;
  
  constructor(private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController, private store: Store) {}

  async ngOnInit() {
    this.parentID = this.store.snapshot().user.id;
    await this.serv.getParent(this.parentID)
    .toPromise()
      .then( 
        res=>{
          this.auPairId = res.auPair;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  async reportUser(formData : any){ 
    this.reportDetails.auPairId = this.auPairId;
    this.reportDetails.issuerId = this.parentID;
    this.reportDetails.desc = formData.desc;

    await this.serv.addReport(this.reportDetails)
    .toPromise()
      .then( 
        res=>{
          this.closeModal();
          this.openToast();
          return res;
      },
      error => {
        console.log("Error has occured with API: " + error);
        return error;
      }
    )
  }

  async openToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Report sent!',
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }
}
