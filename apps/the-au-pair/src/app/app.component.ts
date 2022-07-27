import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { API } from '../../../../libs/shared/api/api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Activity, auPair, Parent } from '../../../../libs/shared/interfaces/interfaces';
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
  userFcmToken = "";
  activitydays: number[] = [];
  upcomingActivity : any;

  days = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ]

  activities: Activity[] = [];

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

    const monInt = setInterval(()=> {
      this.userID = this.store.snapshot().user.id;
      this.userType = this.store.snapshot().user.type;
      if(this.userType == 2 || this.userType == 1)
      {
        this.monitorActivities();
        clearInterval(monInt);
      }
    }, 6000);
  }

  monitorActivities() {
    //if parent, get childrens id's
    if(this.userType == 1){
      this.getAcitivities(this.userID);
    }

    //if au pair, get parent id
    if(this.userType == 2){
      this.serv.getAuPair(this.userID).toPromise().then(res => {
        this.getAcitivities(res.employer)
      }).catch(err => {
        console.log(err);
      });
    }
  }

  setNotification(){

    //user is on mobile
    //TODO: This will finished in future, focusing on web now
    if (this.userFcmToken != ""){ 
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

    
  }

  async getAcitivities(id : string) {
    console.log("getting activities");
    await this.serv.getChildren(id).toPromise().then(res => {
      res.forEach((element: any) => {
        this.serv.getSchedule(element.id).toPromise().then(res => {
          res.forEach((element: any) => {
            if (this.activities.find(x => x.id == element.id ) == undefined) {
              this.activities.push(element);
            }
          });
        }).catch(err => {
          console.log(err);
        });
      });
    }).catch(err => {
      console.log(err);
    });
    
    //udpate day strings to numbers
    this.activities.forEach(element => {
      const stringval = element.day;
      const intval  = this.days.indexOf(stringval) + 1;
      element.day = String(intval);
      this.activitydays.push(intval);
    });

    //sort activitydays
    this.activitydays.sort((a, b) => a - b);
    console.log(this.activitydays);

    //sort activities by day
    this.activities.sort((obj1, obj2) => {
      
      if(Number(obj1.day) > Number(obj2.day))
      {
        return 1;
      }

      if(Number(obj1.day) < Number(obj2.day))
      {
        return -1;
      }

      return 0;
    });

    const current = new Date();
    const currentDay = 7;

    if (this.activitydays.includes(currentDay)){
      //check if activity has already passed
      const act = this.activities.find(x => Number(x.day) == currentDay);

      //check hour first
      let hasPassed = false;
      if(current.getHours() > Number(act?.timeStart.slice(0,2))){
        hasPassed = true;
      }
      else if(current.getHours() == Number(act?.timeStart.slice(0,2))){
        //check minutes
        if(current.getMinutes() > Number(act?.timeStart.slice(3))){
          hasPassed = true;
        }
      }

      if(!hasPassed){
        this.upcomingActivity = act;
      }
      else{ const nextAct = this.activities.find(x => Number(x.day) > currentDay);
        console.log(nextAct);
        this.upcomingActivity = nextAct;
      }
    }
    else{
      //find next activity within the week
      const nextAct = this.activities.find(x => Number(x.day) > currentDay);
      this.upcomingActivity = nextAct;

      if (this.upcomingActivity == undefined){
        this.upcomingActivity = this.activities[0];
      }
      
    }

    this.setNotification();
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
