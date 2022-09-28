import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Activity } from '../../../../../shared/interfaces/interfaces';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';


@Component({
  selector: 'the-au-pair-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.scss'],
})
export class ScheduleModalComponent implements OnInit {

  public navParams = new NavParams;
  activityId: string = this.navParams.get('activityId');
  activityComment!: string;
  activityBehaviour! : number;
  currentActivity!: Activity;

  selectedFiles : any;
  currentFileUpload: any;

  updateText = "Upload";
  
  constructor(private serv: API,private modalCtrl : ModalController ,public toastCtrl: ToastController, public store : Store) {}

  ngOnInit(): void {
    this.getActivity(this.activityId);
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  getDescription(formData : any){
    this.activityComment = formData.desc;
    this.activityBehaviour = formData.behaviour;
    this.currentActivity.comment = this.activityComment;
    this.currentActivity.behavior = this.activityBehaviour;  
    this.submitActivityComments();
  }

  getActivity(activityId : string){
    this.serv.getActivity(activityId).subscribe(
      res => { 
        this.currentActivity = res;
      },
      error => { 
        console.log(error)
      }
    );
  }

  async openToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Activity comments added!',
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  submitActivityComments(){
    this.serv.editActivity(this.currentActivity).subscribe(
      async res=>{
        await this.upload();
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

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedFiles.item(0));
    fileReader.onload = (event) => {
      this.updateText = "Uploaded";
      const dom = document.getElementById("uploadLabel");
      dom?.setAttribute("style","border: 2px solid var(--ion-color-secondary);");
      return event;
    }
  }

  async upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    await this.serv.storeFile(this.currentFileUpload,this.activityId +  ".png").toPromise().then(
      res=>{
        console.log(res); 
        return res;
      },
      error=>{
        console.log(error);
        return error;
      }
    );
  }

}
