import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { auPair, Child, Parent } from '../../../../shared/interfaces/interfaces';
import { JobSummaryModalComponent } from './job-summary-modal/job-summary-modal.component';

@Component({
  selector: 'the-au-pair-hire-requests',
  templateUrl: './hire-requests.component.html',
  styleUrls: ['./hire-requests.component.scss'],
})
export class HireRequestsComponent implements OnInit {
  auPairID = "";
  contracts : any;
  
  childDetails: Child ={
    id: "",
    fname: "",
    sname: "",
    allergies: "",
    diet: "",
    parent: "",
    aupair: "",
  }
  
  contractDetails : any = {
    id: "",
    parentID: "",
    auPairID: "",
    timestamp: "",
    parentName: "",
    parentSurname: "",
    parentEmployee: "",
    auPairEmployer: "",
  }
  ContractArray : any[] = [];

  currentAuPair: auPair = {
    id: "",
    rating: [],
    onShift: false,
    employer: "",
    costIncurred: 0,
    distTraveled: 0,
    payRate: 0,
    bio: "",
    experience: "",
    currentLong: 0.0,
    currentLat: 0.0,
    terminateDate: "",
  }

  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
    rating: []
  }

  constructor(private serv: API, private modalCtrl : ModalController, public toastCtrl: ToastController, private store: Store, private router: Router) {}

  ngOnInit(): void 
  {
    this.auPairID = this.store.snapshot().user.id;
    this.getContracts();
  }

  async getContracts()
  {
    await this.serv.getAllContracts().subscribe(
      res=>{
        this.contracts = res;
        this.setContractArray()
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  setContractArray()
  {
    this.contracts.forEach((c: { id: any, parentID: any; auPairID: any; timestamp: any; parentName: any; parentSurname: any; parentEmployee: any;}) => {
      this.serv.getParent(c.parentID).toPromise()
      .then(
        res=>{          
          if(res.auPair === "")
          {
            this.serv.getAuPair(this.auPairID).toPromise()
            .then(
              res=>{     
                if(res.employer === "")
                {
                  this.serv.getUser(c.parentID).toPromise()
                  .then(
                    res=>{
                      const contractDetails = {
                        id: c.id,
                        parentID: c.parentID,
                        auPairID: c.auPairID,
                        timestamp: c.timestamp,
                        parentName: res.fname,
                        parentSurname: res.sname,
                      }
                      if(c.auPairID == this.auPairID)
                      {
                        this.ContractArray.push(contractDetails);
                      }
                    },
                    error=>{console.log("Error has occured with API: " + error);}
                  )
                }
                },
                error=>{console.log("Error has occured with API: " + error);}
            )
          }
        },
        error=>{console.log("Error has occured with API: " + error);}
      )
    });
  }
  
  async errToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Request has been rejected.',
      duration: 1000,
      position: 'top',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  async sucToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Request has been accepted!',
      duration: 1000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  closeModal()
  {
    this.modalCtrl.dismiss();
  }

  async openModal(parentID : string, contractID : string) {
    const modal = await this.modalCtrl.create({
      component: JobSummaryModalComponent,
      componentProps :{
        parentID : parentID,
        contractID : contractID
      }
    });
    await modal.present();
  }
}
  
