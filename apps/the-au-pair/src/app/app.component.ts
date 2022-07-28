import { Component, OnInit } from '@angular/core';
import { API } from '../../../../libs/shared/api/api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { auPair, Parent } from '../../../../libs/shared/interfaces/interfaces';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit 
{
  //Logged in User details
  userID = "";
  userType = 0;

  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
  }


  //Au Pair object to update their current position
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
    currentLat : 0.0
  }

  constructor(private serv: API, private geolocation: Geolocation, private store: Store)
  {
    //Initialise parentID for logged in user
    this.userID = this.store.snapshot().user.id;
    this.userType = this.store.snapshot().user.type;
    
    if(this.userType == 2 && this.userID != '')
    {
      this.getCurrentAuPairDetails();
    }
  }

  ngOnInit(): void 
  { 
    //Only update coordinates if you are an au pair
    setInterval(()=> {
      this.userID = this.store.snapshot().user.id;
      this.userType = this.store.snapshot().user.type;

      if(this.userType == 2 && this.userID != '')
      {
        if(this.auPairDetails.onShift == true)
        {
          this.getCurrentAuPairDetails();
          this.updateCoordinates();
        }
      } 
    }, 10000);
  }

  async getCurrentAuPairDetails()
  { 
    const res = await this.serv.getAuPair(this.userID).toPromise()
    this.auPairDetails.id = res.id;
    this.auPairDetails.onShift = res.onShift;
    this.auPairDetails.employer = res.employer;
    this.auPairDetails.currentLong = res.currentLong;
    this.auPairDetails.currentLat = res.currentLat;
  };

  async updateCoordinates()
  { 
    let flag = false;
    await this.geolocation.getCurrentPosition().then((resp: { coords: { longitude: number; latitude: number; }; }) => 
    {
      //Check if auPair has actually moved
      if(this.auPairDetails.currentLong != resp.coords.longitude || this.auPairDetails.currentLat != resp.coords.latitude)
        flag = true;

      //Set new coords
      this.auPairDetails.currentLong = resp.coords.longitude;
      this.auPairDetails.currentLat = resp.coords.latitude;

      //Only update if coordinates have changed
      if(flag)
      this.updateAuPair(this.auPairDetails);
            
    }).catch((error: any) => 
    {
      console.log('Error getting location', error);
    });
  }

  updateAuPair(aupair: auPair)
  { 
    //Save new auPair object in the database
    this.serv.editAuPair(aupair).subscribe(
      res=>{
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    )
  }
}
