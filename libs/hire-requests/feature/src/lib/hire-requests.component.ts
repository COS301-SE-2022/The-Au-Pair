import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { auPair, Parent } from 'libs/shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-hire-requests',
  templateUrl: './hire-requests.component.html',
  styleUrls: ['./hire-requests.component.scss'],
})
export class HireRequestsComponent implements OnInit {
  auPairID = "";
  contracts : any;
  
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
    rating: 0,
    onShift: false,
    employer: "",
    costIncurred: 0,
    distTraveled: 0,
    payRate: 0,
    bio: "",
    experience: "",
    currentLong: 0.0,
    currentLat: 0.0
  }

  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
  }

  constructor(private serv: API, private modalCtrl : ModalController, public toastCtrl: ToastController, private store: Store, private router: Router) {}

  ngOnInit(): void 
  {
    this.auPairID = "7954231654823";
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
      this.serv.getParent(c.parentID).subscribe(
        res=>{
          if(res.auPair === "")
          {
            this.serv.getAuPair(c.auPairID).subscribe(
              res=>{                
                if(res.employer === "")
                {
                  this.serv.getUser(c.parentID).subscribe(
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
    console.log(this.ContractArray);
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

  acceptRequest(cID : string, parentID : string)
  {
    this.sucToast();
    // this.router.navigate(['/au-pair-dashboard']);
    console.log(parentID);
    
  }

  rejectRequest(cID : string)
  {
    console.log(cID);
    this.serv.removeContract(cID).subscribe(
      res=>{
        location.reload();
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }
}
  
