import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { ExpandModalComponent } from './expand-modal/expand-modal.component';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'the-au-pair-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  
  minPayrate! : number;
  maxPayrate! : number;

  minDistance! : number;
  maxDistance! : number;

  auPairs : any;
  auPairDetails : any = {
    id: "",
    rating: 0,
    payRate: 0,
    fname: "",
    sname: "",
    address: "",
    employer: "",
    registered: "",
  }
  AuPairArray : any[] = [];
  filteredAuPairArray : any[] = [];
  restoredAuPairArray: any[] = [];
  isOnline!: boolean;

  constructor(private serv: API, public toastCtrl: ToastController, private modalCtrl : ModalController, private menuController : MenuController, public navCtrl: NavController){}

  ngOnInit(): void
  {
    this.getAuPairs();
    this.isOnline = false;
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
    this.auPairs.forEach((ap: { id: any; rating: any; payRate: any; fname: any; sname: any, address: any; employer: any;}) => {
      this.serv.getUser(ap.id).subscribe(
        res=>{
          const auPairDetails = {
            id: ap.id,
            rating: ap.rating,
            payRate: ap.payRate,
            fname: res.fname,
            sname: res.sname,
            address: res.address,
            employer: ap.employer,
            registered: res.registered,
          }
          // Logic for explore that will only show Au Pairs whom are not yet employed
          // This will be added after hiring and terminating is complete
          // if(ap.employer == "" && res.registered == true)
          // {
          //   this.AuPairArray.push(auPairDetails);
          // }

          // This will be removed after hiring and terminating is added
          this.AuPairArray.push(auPairDetails);
          this.restoredAuPairArray.push(auPairDetails);
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

  openMenu()
  {
    this.menuController.toggle('start');
  }

  closeMenu()
  {
    this.menuController.close('start');
  }

  async payRateFilter(formData: any)
  {
    this.AuPairArray.splice(0);
    this.restoredAuPairArray.forEach(val => this.AuPairArray.push(Object.assign({}, val)));
    
    this.minPayrate = formData.min_payrate;
    this.maxPayrate = formData.max_payrate;

    if(this.minPayrate > this.maxPayrate)
    {
      this.errToast()
    }
    else
    {
      this.AuPairArray.sort((obj1, obj2) => {
      
        if(obj1.payRate > obj2.payRate)
        {
          return 1;
        }
  
        if(obj1.payRate < obj2.payRate)
        {
          return -1;
        }
  
        return 0;
      });
  
      this.AuPairArray = this.AuPairArray.filter((element) => {
        return element.payRate > this.minPayrate && element.payRate < this.maxPayrate;
      });
    }
    
    this.closeMenu();
  }

  distanceFilter(formData : any)
  {
    this.minDistance = formData.min_distance;
    this.maxDistance = formData.max_distance;
  }

  updateDriverOnlineStatus() 
  {
    this.isOnline = !this.isOnline;

  //   this.AuPairArray.splice(0);
  //   this.restoredAuPairArray.forEach(val => this.AuPairArray.push(Object.assign({}, val)));

  //   this.AuPairArray = this.AuPairArray.filter((element) => {
  //     if(this.isOnline)
  //     {
  //       return element.gender === 'male';
  //     }
  //     else
  //     {
  //       return element.gender !== 'male';
  //     }
  //   });
  }

  async errToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Maximum values cannot be lower than minimum values!',
      duration: 2000,
      position: 'top',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }
}
