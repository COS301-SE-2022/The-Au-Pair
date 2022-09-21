import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Parent } from '../../../../../shared/interfaces/interfaces';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-parent-rating-modal',
  templateUrl: './parent-rating-modal.component.html',
  styleUrls: ['./parent-rating-modal.component.scss'],
})
export class ParentRatingModalComponent implements OnInit {
  public navParams = new NavParams;
  parentID: string = this.navParams.get('parentId');
  
  auPairID = "";
  parentRating! : number;

  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
    rating: []
  }
  
  constructor(private serv: API, private modalCtrl : ModalController ,public toastCtrl: ToastController, private store: Store) {}

  async ngOnInit() {
    this.auPairID = this.store.snapshot().user.id;
    console.log(this.parentID);
    
    this.getParentDetails();
  }

  async getParentDetails()
  {
    await this.serv.getParent(this.parentID).subscribe( 
        res=>{
          this.parentDetails = res;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
  }

  async getDescription(formData : any){   
    await this.getParentDetails();   

    if(formData.behaviour > 5 || formData.behaviour < 1 || isNaN(+formData.behaviour))
    {
      this.parentRating = 1;
    }
    else
    {
      this.parentRating = formData.behaviour;
    }
    
    this.parentDetails.rating.push(this.parentRating);  
    this.submitRating();
  }

  submitRating(){
    this.serv.editParent(this.parentDetails).subscribe(
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
      message: 'Parent rating added!',
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
