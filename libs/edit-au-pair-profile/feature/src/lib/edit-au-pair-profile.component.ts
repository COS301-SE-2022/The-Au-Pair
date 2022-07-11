import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { User, AuPair } from '../../../../shared/interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'the-au-pair-edit-au-pair-profile',
  templateUrl: './edit-au-pair-profile.component.html',
  styleUrls: ['./edit-au-pair-profile.component.scss'],
})
export class EditAuPairProfileComponent implements OnInit {
  
  hasErr = false;

  userDetails: User = {
    id: "",
    fname: "",
    sname: "",
    email: "",
    address: "",
    registered: false,
    type: 0,
    password: "",
    number: "",
  }

  auPairDetails: AuPair = {
    id: "",
    rating: 0,
    onShift: false,
    employer: "",
    costIncurred: 0,
    distTraveled: 0,
    payRate: 0,
  }

  constructor(private serv: API, public toastCtrl: ToastController){}

  ngOnInit(): void
  {
    this.getUserDetails()
  }

  async getUserDetails()
  {
    /* User Details */
    await this.serv.getUser("7542108615984").subscribe(
      res=>{
        this.userDetails.id = res.id;
        this.userDetails.fname = res.fname;
        this.userDetails.sname = res.sname;
        this.userDetails.email = res.email;
        this.userDetails.address = res.address;
        this.userDetails.registered = res.registered;
        this.userDetails.type = res.type;
        this.userDetails.password = res.password;
        this.userDetails.number = res.number;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
    await this.serv.getAuPair("7542108615984").subscribe(
      res=>{
        this.auPairDetails.id = res.id;
        this.auPairDetails.rating = res.rating;
        this.auPairDetails.onShift = res.onShift;
        this.auPairDetails.employer = res.employer;
        this.auPairDetails.costIncurred = res.costIncurred;
        this.auPairDetails.distTraveled = res.distTraveled;
        this.auPairDetails.payRate = res.payRate;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  };

  getUserFormDetails(val : any)
  {  
    //FORM ERROR CHECKING
    let emptyInput = false;
    let dom = document.getElementById("emailError");
    if(val.email === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Email address is empty";
        dom.style.display = "block";
      }
    }
    else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    dom = document.getElementById("phoneError");
    if(val.phone === "")
    { 
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Phone number is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    dom = document.getElementById("addressError");
    if(val.address === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Address is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    dom = document.getElementById("payRateError");
    if(val.payRate === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Pay Rate is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    
    if(emptyInput == true)
    {
      console.log("You cannot have any empty fields.");
    }
    else
    {
      this.userDetails.email = val.email;
      this.userDetails.number = val.phone;
      this.userDetails.address = val.address;
      this.auPairDetails.payRate = val.payRate;
      this.editDetails(this.userDetails, this.auPairDetails);
    }
  }

  async editDetails(user:User, aupair:AuPair)
  {
    console.log("HERE:", user)
    console.log("HERE:", aupair)
    await this.editUser(user);
    
    await this.editAuPair(aupair);    

    if(this.hasErr)
    {
      this.errToast();
    }
    else
    {
      this.openToast();
    }
    
  }

  editUser(user:User){    
    this.serv.editUser(user).subscribe(
      res=>{
        console.log("The response is:" + res); 
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        this.hasErr = true;
        return error;
      }
    )
  };

  editAuPair(aupair:AuPair){
    this.serv.editAuPair(aupair).subscribe(
      res=>{
        console.log("The response is:" + res); 
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        this.hasErr = true;
        return error;
      }
    )
  };

  async openToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Profile successfully updated!',
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  async errToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Unable to update profile!',
      duration: 4000,
      position: 'top',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }
}