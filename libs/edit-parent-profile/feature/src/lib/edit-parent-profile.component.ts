import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { User, medAid, Parent } from '../../../../shared/interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'the-au-pair-edit-parent-profile',
  templateUrl: './edit-parent-profile.component.html',
  styleUrls: ['./edit-parent-profile.component.scss'],
})
export class EditParentProfileComponent implements OnInit{
  
  parentID = "";
  hasErr = false;
  sameFlag = false;
  errFlag = true;

  location = "";
  long = 0;
  lat = 0;
  suburb = "";

  potentialLocations : any[] = [];

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
    fcmToken : "",
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

  constructor(private serv: API, private http: HttpClient, public toastCtrl: ToastController, private store: Store){}

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
        //Check that the selected location is from the API
        let flag = false;
        this.getLocations()
        this.potentialLocations.forEach((element) => {
          if(dom != null)
          {
            if(element.display_name == this.location)
            {
              flag = true;
              return;
            }
          }
        })
        if(val.address === this.userDetails.address)
        {
          dom.style.display = "none";
          this.sameFlag = true;
        }
        else if(!flag)
        {
          dom.innerHTML = "Please select a valid location from the suggested below.";
          dom.style.display = "block";
          flag = false;
          this.errFlag = false;
        }
        else
        {
          dom.style.display = "none";
          this.potentialLocations.forEach((element) => {
            if(element.display_name == this.location)
            {
              this.long = parseFloat(element.lon);
              this.lat = parseFloat(element.lat);
              this.suburb = element.address.suburb;
            }
          })
        }
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
      if(this.errFlag === false)
      {
        this.errToast("Please select a valid location from the suggested below.");
      }
      else if(this.sameFlag === true)
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
      else
      {
        this.userDetails.email = val.email;
        this.userDetails.number = val.phone;
        this.userDetails.address = val.address;
        this.userDetails.latitude = this.lat;
        this.userDetails.longitude = this.long;
        this.userDetails.suburb = this.suburb;
        this.medAidDetails.name = val.medicalAidMM;
        this.medAidDetails.plan = val.medicalAidPlan;
        this.medAidDetails.provider = val.medicalAidProvider;
        this.medAidDetails.mID = val.medicalAidNo;
        this.medAidDetails.sname = val.medicalAidMS;
        this.editDetails(this.userDetails, this.medAidDetails);
      }
    }
  }

  async editDetails(user:User, medAid:medAid)
  {    
    await this.editUser(user);
    await this.editMedAid(medAid);    

    this.openToast();
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

  async errToast(mes : string)
  {
    const toast = await this.toastCtrl.create({
      message: mes,
      duration: 4000,
      position: 'top',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  async getLocations()
  {
    const loc = this.location;
    
    //Building the API query according to what is in the location input field
    const locationParam = loc.replace(' ', '+');
    const params = locationParam + '&limit=4&format=json&polygon_geojson=1&addressdetails=1';

    //Make the API call
    await this.http.get('https://nominatim.openstreetmap.org/search?q='+params)
    .toPromise()
    .then(data=>{ // Success
      //Populate potential Locations Array
      const json_data = JSON.stringify(data);
      const res = JSON.parse(json_data);

      //Jump out if no results returned
      if(json_data === "{}")
      {
        return;
      }
  
      //Add returned data to the array
      const len = res.length;
      for (let j = 0; j < len && j<4; j++) 
      {      
        this.potentialLocations.push(res[j]);
      }
      
    })
    .catch(error=>{ // Failure
      console.log(error);
    });
  }
}
