import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { User, medAid, Parent } from '../../../../shared/interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'the-au-pair-edit-parent-profile',
  templateUrl: './edit-parent-profile.component.html',
  styleUrls: ['./edit-parent-profile.component.scss'],
})
export class EditParentProfileComponent implements OnInit{
  
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

  constructor(private serv: API, public toastCtrl: ToastController){}

  ngOnInit(): void
  {
    this.getUserDetails()
  }

  async getUserDetails()
  {
    /* User Details */
    await this.serv.getUser("4561237814867").subscribe(
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
    await this.serv.getMedAid("7534286951").subscribe(
      res=>{
        this.medAidDetails.id = res.id;
        this.medAidDetails.plan = res.plan;
        this.medAidDetails.name = res.name;
        this.medAidDetails.sname = res.sname;          
        this.medAidDetails.mID = res.mID;
        this.medAidDetails.provider = res.provider;
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

  editMedAid(medAid:medAid){
    this.serv.getParent("4561237814867").subscribe(
      res=>{
        this.parent.id = res.id;
        this.parent.children = res.children;
        this.parent.medID = medAid.mID;
        this.parent.auPair = res.auPair;
        
        //Update the parent object to contain the new child ID
        this.serv.editParent(this.parent).subscribe(
          res=>{
            console.log("The response is:" + res); 
          },
          error=>{
            console.log("Error has occured with API: " + error);
          }
        );
      },
      error=>{
        console.log("Error has occured with API: " + error);
      }
    )
    this.serv.editMedAid(medAid).subscribe(
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
