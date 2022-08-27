import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { User, auPair } from '../../../../shared/interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'the-au-pair-edit-au-pair-profile',
  templateUrl: './edit-au-pair-profile.component.html',
  styleUrls: ['./edit-au-pair-profile.component.scss'],
})
export class EditAuPairProfileComponent implements OnInit {
  
  aupairID = "";
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

  auPairDetails: auPair = {
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
    currentLat: 0.0,
    terminateDate: "",
  }

  constructor(private serv: API, private http: HttpClient, public toastCtrl: ToastController, private store: Store){}

  ngOnInit(): void
  {
    this.aupairID = this.store.snapshot().user.id;
    this.getUserDetails()
  }

  async getUserDetails()
  {
    /* User Details */
    await this.serv.getUser(this.aupairID).subscribe(
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
      error=>{console.log("Error has occured with API: " + error);}
    )
    await this.serv.getAuPair(this.aupairID).subscribe(
      res=>{
        this.auPairDetails.id = res.id;
        this.auPairDetails.rating = res.rating;
        this.auPairDetails.onShift = res.onShift;
        this.auPairDetails.employer = res.employer;
        this.auPairDetails.costIncurred = res.costIncurred;
        this.auPairDetails.distTraveled = res.distTraveled;
        this.auPairDetails.payRate = res.payRate;
        this.auPairDetails.bio = res.bio;
        this.auPairDetails.experience = res.experience;
        this.auPairDetails.currentLong = res.currentLong;
        this.auPairDetails.currentLat = res.currentLat;
        this.auPairDetails.terminateDate = res.terminateDate;
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
    dom = document.getElementById("bioError");
    if(val.bio === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Bio is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    dom = document.getElementById("experienceError");
    if(val.experience === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Experience is empty";
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
        this.auPairDetails.payRate = val.payRate;
        this.auPairDetails.bio = val.bio;
        this.auPairDetails.experience = val.experience;
        this.editDetails(this.userDetails, this.auPairDetails);
      }
      else
      {
        this.userDetails.email = val.email;
        this.userDetails.number = val.phone;
        this.userDetails.address = val.address;
        this.userDetails.latitude = this.lat;
        this.userDetails.longitude = this.long;
        this.userDetails.suburb = this.suburb;
        this.auPairDetails.payRate = val.payRate;
        this.auPairDetails.bio = val.bio;
        this.auPairDetails.experience = val.experience;
        this.editDetails(this.userDetails, this.auPairDetails);
      }
    }
  }

  async editDetails(user:User, aupair:auPair)
  {
    await this.editUser(user); 
    await this.editAuPair(aupair);    

    if(this.hasErr)
    {
      this.errToast("Unable to update profile.");
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

  editAuPair(aupair:auPair){
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
