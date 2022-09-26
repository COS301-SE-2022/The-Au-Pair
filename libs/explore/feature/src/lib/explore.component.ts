import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { ExpandModalComponent } from './expand-modal/expand-modal.component';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { SetImgString } from '../../../../shared/ngxs/actions';

@Component({
  selector: 'the-au-pair-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {

  parentID = "";

  currentParentx! : number;
  currentParenty! : number;

  minPayrate! : number;
  maxPayrate! : number;

  minDistance! : number;
  maxDistance! : number;

  maxAge! : number;

  eucDistance! : number;

  hasImage = false;
  src = "";

  auPairs : any;
  auPairDetails : any = {
    id: "",
    rating: [],
    payRate: 0,
    fname: "",
    sname: "",
    suburb: "",
    employer: "",
    registered: "",
    birth: "",
    gender: "",
    longitude: 0,
    latitude: 0,
    distance: 0,
  }

  AuPairArray : any[] = [];
  filteredAuPairArray : any[] = [];
  restoredAuPairArray: any[] = [];
  isOnline!: boolean;

  constructor(private serv: API, public toastCtrl: ToastController, private modalCtrl : ModalController, private menuController : MenuController, public navCtrl: NavController, private store: Store){}

  async ngOnInit()
  {
    this.parentID = this.store.snapshot().user.id;

    await this.serv.getUser(this.parentID).toPromise()
    .then( 
      res=>{
        this.currentParentx = res.latitude;
        this.currentParenty = res.longitude;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

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

  setAuPairArray()
  {
    this.auPairs.forEach((ap: { id: any; rating: any; payRate: any; fname: any; sname: any, suburb: any; employer: any; birth: any; gender: any; longitude: any; latitude: any; distance: any;}) => {
      this.serv.getUser(ap.id).subscribe(
        res=>{
          const eucdistance = this.calculateEucDistance(res.latitude, res.longitude);
          
          const auPairDetails = {
            id: ap.id,
            rating: this.getAverage(ap.rating),
            payRate: ap.payRate,
            fname: res.fname,
            sname: res.sname,
            suburb: res.suburb,
            employer: ap.employer,
            registered: res.registered,
            birth: res.birth,
            gender: res.gender,
            distance: eucdistance,
          }

          this.setImage(ap.id);
          // Logic for explore that will only show Au Pairs whom are not yet employed
          if(ap.employer == "" && res.registered == true && res.banned == "")
          {
            this.AuPairArray.push(auPairDetails);
            this.restoredAuPairArray.push(auPairDetails);
          }
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
    this.menuController.toggle('end');
  }

  closeMenu()
  {
    this.menuController.close('end');
  }

  async payRateFilter(formData: any)
  {
    this.AuPairArray.splice(0);
    this.restoredAuPairArray.forEach(val => this.AuPairArray.push(Object.assign({}, val)));

    if(formData.min_payrate === undefined || formData.min_payrate === '')
    {
      this.minPayrate = 10;
    }
    else
    {
      this.minPayrate = formData.min_payrate;
    }
    
    if(formData.max_payrate === undefined || formData.max_payrate === '')
    {
      this.maxPayrate = 10;
    }
    else
    {
      this.maxPayrate = formData.max_payrate;
    }

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
        return element.payRate >= this.minPayrate && element.payRate <= this.maxPayrate;
      });
    }
    
    this.closeMenu();
  }

  ageFilter(formData : any)
  {
    this.AuPairArray.splice(0);
    this.restoredAuPairArray.forEach(val => this.AuPairArray.push(Object.assign({}, val)));

    if(formData.max_age === undefined || formData.max_age === '')
    {
      this.maxAge = 18;
    }
    else
    {
      this.maxAge = formData.max_age;
    }

    this.AuPairArray.sort((obj1, obj2) => {
    
      if(this.getAge(obj1.birth) > this.getAge(obj2.birth))
      {
        return 1;
      }

      if(this.getAge(obj1.birth) < this.getAge(obj2.birth))
      {
        return -1;
      }

      return 0;
    });

    this.AuPairArray = this.AuPairArray.filter((element) => {
      return this.getAge(element.birth) <= this.maxAge;
    });

    this.closeMenu();
  }

  distanceFilter(formData : any)
  {
    this.AuPairArray.splice(0);
    this.restoredAuPairArray.forEach(val => this.AuPairArray.push(Object.assign({}, val)));
    
    if(formData.max_distance === undefined || formData.max_distance === '')
    {
      this.maxDistance = 10;
    }
    else
    {
      this.maxDistance = formData.max_distance;
    }

    this.AuPairArray.sort((obj1, obj2) => {
      
      if(obj1.distance > obj2.distance)
      {
        return 1;
      }

      if(obj1.distance < obj2.distance)
      {
        return -1;
      }

      return 0;
    });

    this.AuPairArray.sort((obj1, obj2) => {
    
      if(obj1.distance > obj2.distance)
      {
        return 1;
      }

      if(obj1.distance < obj2.distance)
      {
        return -1;
      }

      return 0;
    });

    this.AuPairArray = this.AuPairArray.filter((element) => {
      return element.distance <= this.maxDistance;
    });

    this.closeMenu();
  }

  updateDriverOnlineStatus() 
  {
    this.isOnline = !this.isOnline;

    this.AuPairArray.splice(0);
    this.restoredAuPairArray.forEach(val => this.AuPairArray.push(Object.assign({}, val)));

    this.AuPairArray = this.AuPairArray.filter((element) => {
      if(this.isOnline)
      {
        return element.gender === 'male';
      }
      else
      {
        return element.gender !== 'male';
      }
    });

    this.closeMenu();
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

  calculateEucDistance(auPairx : number, auPairy : number)
  {
    const parX = (this.currentParentx * Math.PI) / 180;
    const parY = (this.currentParenty * Math.PI) / 180;
    auPairx = (auPairx * Math.PI) / 180;
    auPairy = (auPairy * Math.PI) / 180;

    const dlong = auPairy - parY;
    const dlat = auPairx - parX;

    this.eucDistance = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(parX) * Math.cos(auPairx) * Math.pow(Math.sin(dlong / 2), 2);

    this.eucDistance = 2 * Math.asin(Math.sqrt(this.eucDistance));

    this.eucDistance = this.eucDistance * 6371;

    return this.eucDistance;
  }

  getAge(dateString : string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
  }

  resetFilters()
  {
    this.AuPairArray.splice(0);
    this.restoredAuPairArray.forEach(val => this.AuPairArray.push(Object.assign({}, val)));

    this.closeMenu();
  }

  getAverage(ratings : number[])
  {
    if(ratings.length == 0)
    {
      return 0;
    }

    let total = 0;
    for(let i = 0; i < ratings.length; i++)
    {
      total += ratings[i];
    }

    const avg = total/ratings.length;

    if(avg < 1 || avg > 5)
    {
      return 0;
    }

    if((avg % 1) == 0)
    {
      return avg;
    }

    const ret = (Math.round(avg * 100) / 100).toFixed(1);

    return ret;
  }

  async setImage(id: string){
    await this.serv.getFile(id +  ".png").toPromise().then(
      async res=>{
        const dataType = res.type;
        const binaryData = [];
        binaryData.push(res);
        const href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        this.store.dispatch(new SetImgString(href));
        const dom = document.getElementById(id);

        if(dom != null)
        {
          dom.setAttribute("src", this.store.snapshot().user.imgString);
        }

        this.hasImage = true;
      },
      error=>{
        const dom = document.getElementById(id);
        if (dom != null) {
          dom.setAttribute("src","assets/images/placeholder-profile.jpg");
        }
        this.hasImage = true;
        return error;
      }
    );
  }
}
