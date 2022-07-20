import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { ExpandModalComponent } from './expand-modal/expand-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'the-au-pair-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  
  auPairs : any;
  auPairDetails : any = {
    id: "",
    rating: 0,
    payRate: 0,
    fname: "",
    sname: "",
    address: "",

  }
  AuPairArray : any[] = [];

  constructor(private serv: API, private modalCtrl : ModalController){}

  ngOnInit(): void
  {
    this.getAuPairs();
  }

  async getAuPairs()
  {
    await this.serv.getAllAuPairs().subscribe(
      res=>{
        this.auPairs = res;
        this.setAuPairArray();
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  async setAuPairArray()
  {
    this.auPairs.forEach((ap: { id: any; rating: any; payRate: any; fname: any; sname: any, address: any;}) => {
      this.serv.getUser(ap.id).subscribe(
        res=>{
          const auPairDetails = {
            id: ap.id,
            rating: ap.rating,
            payRate: ap.payRate,
            fname: res.fname,
            sname: res.sname,
            address: res.address,
          }
          this.AuPairArray.push(auPairDetails);
        },
        error=>{console.log("Error has occured with API: " + error);}
      )
    });
  }

  async openModal(aupairID : string) {
    const modal = await this.modalCtrl.create({
      component: ExpandModalComponent,
      componentProps :{
        auPairId : aupairID
      }
    });
    await modal.present();
  }
}


