import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { User, medAid, Parent } from '../../../../shared/interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-edit-parent-profile',
  templateUrl: './edit-parent-profile.component.html',
  styleUrls: ['./edit-parent-profile.component.scss'],
})
export class EditParentProfileComponent implements OnInit{
  
  parentID = "";
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
    salt: "",
    latitude: 0,
    longitude: 0,
    suburb: "",
    gender: "",
    birth: "",
    warnings: 0,
    banned: "",
  }

  medAidDetails: medAid = {
    id: "",
    plan: "",
    name: "",
    sname: "",
    mID: "",
    provider: "",
  }

  parent: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
  }

  constructor(private serv: API, public toastCtrl: ToastController, private store: Store){}

  ngOnInit(): void
  {
    this.parentID = this.store.snapshot().user.id;
    this.getUserDetails()
  }

  async getUserDetails()
  {
    /* User Details */
    await this.serv.getUser(this.parentID)
    .toPromise()
    .then(
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
        this.userDetails.salt = res.salt;
        this.userDetails.latitude = res.latitude;
        this.userDetails.longitude = res.longitude;
        this.userDetails.suburb = res.suburb;
        this.userDetails.gender = res.gender;
        this.userDetails.birth = res.birth;
        this.userDetails.warnings = res.warnings;
        this.userDetails.banned = res.banned;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )

    await this.serv.getParent(this.parentID)
    .toPromise()
    .then(
      res => {
        this.parent.id = res.id;
        this.parent.children = res.children;
        this.parent.medID = res.medID;
        this.parent.auPair = res.auPair;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )  

    await this.serv.getMedAid(this.parent.medID)
    .toPromise()
    .then(
      res=>{
        this.medAidDetails.id = res.id;
        this.medAidDetails.plan = res.plan;
        this.medAidDetails.name = res.name;
        this.medAidDetails.sname = res.sname;          
        this.medAidDetails.mID = res.mID;
        this.medAidDetails.provider = res.provider;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
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
    dom = document.getElementById("medAidMMError");
    if(val.medicalAidMM === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Main Member Name is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    dom = document.getElementById("medAidMSError");
    if(val.medicalAidMS === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Main Member Surname is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    dom = document.getElementById("medAidNoError");
    if(val.medicalAidNo === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Medical Aid Number is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    dom = document.getElementById("medAidProviderError");
    if(val.medicalAidProvider === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Medical Aid Provider is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    dom = document.getElementById("medAidPlanError");
    if(val.medicalAidPlan === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Medical Aid Plan is empty";
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
      this.medAidDetails.name = val.medicalAidMM;
      this.medAidDetails.plan = val.medicalAidPlan;
      this.medAidDetails.provider = val.medicalAidProvider;
      this.medAidDetails.mID = val.medicalAidNo;
      this.medAidDetails.sname = val.medicalAidMS;
      this.editDetails(this.userDetails, this.medAidDetails);
    }
  }

  async editDetails(user:User, medAid:medAid)
  {
    await this.editUser(user);
    await this.editMedAid(medAid);    

    if(this.hasErr)
    {
      this.errToast();
    }
    else
    {
      this.openToast();
    } 
  }

  async editUser(user:User){    
    await this.serv.editUser(user)
    .toPromise()
    .then(
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

  async editMedAid(medAid:medAid)
  {
    this.parent.medID = medAid.mID;
    await this.serv.editParent(this.parent)
    .toPromise()
    .then(
      res => {
        console.log("The response is:" + res); 
      },
      error=>{
        console.log("Error has occured with API: " + error);
      }
    )

    await this.serv.editMedAid(medAid)
    .toPromise()
    .then(
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
