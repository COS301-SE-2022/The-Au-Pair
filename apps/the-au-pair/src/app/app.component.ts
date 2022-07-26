import { Component, OnInit } from '@angular/core';
import { API } from '../../../../libs/shared/api/api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { auPair } from '../../../../libs/shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit 
{
  
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

  constructor(private serv: API, private geolocation: Geolocation)
  {
    this.getCurrentAuPairDetails();
  }

  ngOnInit(): void 
  {
    //if user is an auPair
    setInterval(()=> {
      if(this.auPairDetails.onShift == true)
        this.getCurrentAuPairDetails();
        this.updateCoordinates();
        }, 5000);
  }

  async getCurrentAuPairDetails()
  {
    const res = await this.serv.getAuPair("7542108615984").toPromise()
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
    }).catch((error: any) => 
    {
      console.log('Error getting location', error);
    });

    //Only update if coordinates have changed
    if(flag)
      this.updateAuPair(this.auPairDetails);
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
