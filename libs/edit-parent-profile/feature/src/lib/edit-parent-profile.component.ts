import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { User, Parent, medAid } from '../../../../shared/interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'the-au-pair-edit-parent-profile',
  templateUrl: './edit-parent-profile.component.html',
  styleUrls: ['./edit-parent-profile.component.scss'],
})
export class EditParentProfileComponent implements OnInit{
  
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

  parentDetails: Parent = {
    id: "",
    cildren: [],
    medID: "",
    auPair: "",
  }

  medAidDetails: medAid = {
    id: "",
    plan: "",
    name: "",
    sname: "",
    mID: "",
  }


  constructor(private serv: API, public toastCtrl: ToastController)
  {

  }

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
      await this.serv.getParent("4561237814867").subscribe(
        res=>{
          this.parentDetails.id = res.id;
          this.parentDetails.cildren = res.cildren;
          this.parentDetails.medID = res.medID;
          this.parentDetails.auPair = res.auPair;
        },
        error=>{console.log("Error has occured with API: " + error);}
      )
      await this.serv.getMedAid("7534286951").subscribe(
        res=>{
          this.medAidDetails.id = res.id;
          this.medAidDetails.plan = res.plan;
          this.medAidDetails.name = res.name;
          this.medAidDetails.sname = res.sname;          
          this.medAidDetails.mID = res.mid;
          console.log(res);
          console.log(this.medAidDetails);
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
    // dom = document.getElementById("medAidProviderError");
    // if(val.medicalAidProvider === "")
    // {
    //   emptyInput = true;
    //   if(dom != null)
    //   {
    //     dom.innerHTML = "Medical Aid Provider is empty";
    //     dom.style.display = "block";
    //   }
    // }else
    // {
    //   if(dom != null)
    //   {
    //     dom.style.display = "none";
    //   }
    // }
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
      // this.medAidDetails.provider = val.medicalAidProvider;
      this.medAidDetails.id = val.medicalAidNo;
      this.medAidDetails.sname = val.medicalAidMS;
      this.editUser(this.userDetails);
      this.editMedAid(this.medAidDetails);
    }
  }

  // verifyDetails(){
    
  // }

  editUser(user:User){
    this.serv.editUser(user).subscribe(
      res=>{
        // location.reload();
        console.log("The response is:" + res); 
        this.openToast();
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    )
  };

  editMedAid(medAid:medAid){
    this.serv.editMedAid(medAid).subscribe(
      res=>{
        // location.reload();
        console.log("The response is:" + res); 
        this.openToast();
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
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
}
