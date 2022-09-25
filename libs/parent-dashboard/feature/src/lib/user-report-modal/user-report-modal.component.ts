import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Email, Report } from '../../../../../shared/interfaces/interfaces';
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
    reportIssuerId: "",
    reportedUserId: "",
    desc: ""
  }

  emailRequest: Email ={
    to: '',
    subject: '',
    body: '',
  }
  
  public navParams = new NavParams;
  public sending = false;
  
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
    if(formData.desc == "") {
      this.openToast("Please add a description");
      return;
    }
    
    this.sending = true;
    this.reportDetails.reportIssuerId = this.parentID;
    this.reportDetails.reportedUserId = this.auPairId;
    this.reportDetails.desc = formData.desc;

    await this.serv.addReport(this.reportDetails)
    .toPromise()
      .then( 
        async res=>{
          this.closeModal();
          this.openToast("Report sent!");

          //send report confirmation email parent
          this.emailRequest.to = this.store.snapshot().user.email;
          this.emailRequest.subject = "Report Submitted succesfully";
          this.emailRequest.body = "We have received your report of your au pair.\nWe will look into the report and issue a warning if deemed necessary by our admin team. " +
                                   "Please make sure if any further issues arise that you log another report.\n\nRegards,\nThe Au Pair Team";
          //send email to au pair
          await this.serv.sendEmail(this.emailRequest).toPromise().then(
            res => {
              return res;
            },
            error => {
              console.log(error);
            }
          );

          this.sending = false;
          return res;
      },
      error => {
        console.log("Error has occured with API: " + error);
        this.sending = false;
        return error;
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
