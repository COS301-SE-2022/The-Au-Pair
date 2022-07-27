import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private serv: API, private geolocation: Geolocation, private store: Store, private httpClient: HttpClient)
  {
    //Initialise parentID for logged in user
    this.userID = this.store.snapshot().user.id;
    this.userType = this.store.snapshot().user.type;
    
    if(this.userType == 2 && this.userID != '')
    {
      this.getCurrentAuPairDetails();
    }

    this.monitorActivities();
    
  }

  ngOnInit(): void { 
    //Only update coordinates if you are an au pair
    setInterval(()=> {
    this.userID = this.store.snapshot().user.id;
    this.userType = this.store.snapshot().user.type;
    if(this.userType == 2 && this.userID != '')
    {
      console.log(this.userID,this.userType)
      if(this.auPairDetails.onShift == true)
      {
        this.getCurrentAuPairDetails();
        this.updateCoordinates();
      }
    } }, 10000);
  }

  monitorActivities() {
    const  requestHeaders = new HttpHeaders().set('Authorization', 'key=AAAAlhtqIdQ:APA91bFlcYmdaqt5D_jodyiVQG8B1mkca2xGh6XKeMuTGtxQ6XKhSY0rdLnc0WrXDsV99grFamp3k0EVHRUJmUG9ULcxf-VSITFgwwaeNvrUq48q0Hn1GLxmZ3GBAYdCBzPFIRdbMxi9');
    
    const postData = {
      "to":"e7q50QKSR0I1_Wenw7Hdll:APA91bE2_LMf6MAfCmBAsSye4f9vLIvXWt5c4lKrKdamNsf5lyLoefH6_qbN-3psEh2EIQWcnzw0VbN6x8mfpC0cosQnOqC5-OdPEyg_8EeKJB6F0tBGNRIq5YNiGjem5AnZcV7xqm0Fg",
      "notification":{
        "title":"Order #44",
        "body": "Hello bro"
      }
    }

    const hour = 12;
    const mins = 38;
    const day = 3;
    
    const intv = setInterval( () => {
      const current = new Date();
      console.log(current.getHours(), current.getMinutes(), current.getSeconds());
      if ( current.getHours() == hour && current.getMinutes() == mins && current.getDay() == day ) {
        console.log("sending");
        this.httpClient.post('https://fcm.googleapis.com/fcm/send',postData, {headers: requestHeaders}).subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        });
        clearInterval(intv);
      }
  
    }, 60000);
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
