import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { User, medAid, Parent } from '../../../../shared/interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SetImgString } from '../../../../shared/ngxs/actions';

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

  isInput = false;
  isEmpty = false;

  potentialLocations : any[] = [];

  selectedFiles : any;
  currentFileUpload: any;
  hasImage = false;

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
    rating: []
  }

  constructor(private serv: API, private http: HttpClient, public toastCtrl: ToastController, private store: Store, public router: Router){}

  ngOnInit(): void
  {
    this.setImage();
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
        this.parent.rating = res.rating;
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
    this.isInput = false;
    this.isEmpty = false;
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
      this.isEmpty = true;
    }
    else
    {
      this.isInput = true
    }
    dom = document.getElementById("medAidMSError");
    if(val.medicalAidMS === "")
    {
      this.isEmpty = true;
    }
    else
    {
      this.isInput = true
    }
    dom = document.getElementById("medAidNoError");
    if(val.medicalAidNo === "")
    {
      this.isEmpty = true;
    }
    else
    {
      this.isInput = true
    }
    dom = document.getElementById("medAidProviderError");
    if(val.medicalAidProvider === "")
    {
      this.isEmpty = true;
    }
    else
    {
      this.isInput = true
    }
    dom = document.getElementById("medAidPlanError");
    if(val.medicalAidPlan === "")
    {
      this.isEmpty = true;
    }
    else
    {
      this.isInput = true
    }
    
    if(emptyInput == true)
    {
      this.errToast("You cannot have any empty fields.");
    }
    else if(this.isEmpty == true && this.isInput == true)
    {
      this.errToast("There are missing fields for your medical aid details.");
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
    
    this.checkImageBeforeRedirect();
  }

  async checkImageBeforeRedirect(){
    if (this.selectedFiles != undefined) {
      //upload the images if file selected
      this.currentFileUpload = this.selectedFiles.item(0);
      await this.serv.storeFile(this.currentFileUpload,this.store.snapshot().user.id  +  ".png").toPromise().then(
      res=>{
        console.log(res); 
        //only redirect on success
        this.openToast('Profile successfully updated!');
        this.router.navigate(['/parent-dashboard']);
      },
      error=>{
        this.openToast('Error uploading image!')
        return error;
      });
    }
    else{
      this.openToast('Profile successfully updated!');
      this.router.navigate(['/parent-dashboard']);
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

  async openToast(message : string)
  {
    const toast = await this.toastCtrl.create({
      message: message,
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
    const params = locationParam + '&limit=5&format=json&polygon_geojson=1&addressdetails=1';

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

      this.potentialLocations.splice(0);
      
      //Add returned data to the array
      const len = res.length;
      for (let j = 0; j < len && j<5; j++) 
      {  
        if (this.potentialLocations.includes(res[j].display_name) === false){
          this.potentialLocations.push(res[j]); 
        }   
      }
      
    })
    .catch(error=>{ // Failure
      console.log(error);
    });
  }

  radioChecked(event: any){
    this.location = event.target.value;
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedFiles.item(0));
    fileReader.onload = (event) => {
      const dom = document.getElementById("img2");
      if (dom != null) {
        const ev = event.target;
        if (ev != null) {
          const res = ev.result as string;
          if (res != null) {
            dom.setAttribute("src",res);
          }
        }
      }
    }
  }

  async upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    await this.serv.storeFile(this.currentFileUpload,this.store.snapshot().user.id  +  ".png").toPromise().then(
      res=>{
        console.log(res); 
        return res;
      },
      error=>{
        console.log(error);
        return error;
      }
    );
  }

  async setImage(){
    await this.serv.getFile(this.store.snapshot().user.id  +  ".png").toPromise().then(
      async res=>{
        const dataType = res.type;
        const binaryData = [];
        binaryData.push(res);
        const href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        this.store.dispatch(new SetImgString(href));
        const dom = document.getElementById("img2");

        if(dom != null)
        {
          dom.setAttribute("src", this.store.snapshot().user.imgString);
        }

        this.hasImage = true;
      },
      error=>{
        const dom = document.getElementById("img2");
        if (dom != null) {
          dom.setAttribute("src","assets/images/placeholder-profile.jpg");
        }
        this.hasImage = true;
        return error;
      }
    );
  }
}
