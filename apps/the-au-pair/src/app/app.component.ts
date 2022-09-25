import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API } from '../../../../libs/shared/api/api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Activity, auPair, Parent, Notification, Child } from '../../../../libs/shared/interfaces/interfaces';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Reset } from '../../../../libs/shared/ngxs/actions';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'the-au-pair-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  //Logged in User details
  userID = "";
  userType = 0;
  userFcmToken = "";
  activitydays: number[] = [];
  previousActivityID = "";
  currentActivityID = "";

  //navbar variables
  isHome = (this.router.url == "/parent-dashboard" || this.router.url == "/au-pair-dashboard");

  days = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ]

  upcomingActivity: Activity = {
    id: '',
    name: '',
    description: '',
    location: '',
    boundary: 0,
    longitude: 0.0,
    latitude: 0.0,
    timeStart: '',
    timeEnd: '',
    budget: 0,
    comment: '',
    behavior: 0,
    day: '',
    child: '',
  }

  activities: Activity[] = [];
  currentActivities: Activity[] = [];

  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
    rating: []
  }

  //Au Pair object to update their current position
  auPairDetails: auPair = {
    id: "",
    rating: [],
    onShift: false,
    employer: "",
    costIncurred: 0,
    distTraveled: 0,
    payRate: 0,
    bio: "",
    experience: "",
    currentLong: 0.0,
    currentLat: 0.0,
    alreadyOutOfBounds: false,
    terminateDate: "",
  }

  notificationToSend: Notification = {
    id: "",
    auPairId: "",
    parentId: "",
    title: "",
    body: "",
    date: "",
    time: "",
  }

  outOfBoundsNotification: Notification = {
    id: "",
    auPairId: "",
    parentId: "",
    title: "",
    body: "",
    date: "",
    time: "",
  }  

  constructor(private menController : MenuController,
    public toastCtrl: ToastController,
    private router : Router,
    private serv: API,
    private geolocation: Geolocation,
    public store: Store,
    private httpClient: HttpClient) {
    //Initialise parentID for logged in user
    this.userID = this.store.snapshot().user.id;
    this.userType = this.store.snapshot().user.type;

    if (this.userType == 2 && this.userID != '') {
      this.getCurrentAuPairDetails();
    }
  }

  ngOnInit(): void 
  {
    this.menController.swipeGesture(false);
    /**
     * Updating au pair coordinates when on shift
     */

    setInterval(() => 
    {
      this.userID = this.store.snapshot().user.id;
      this.userType = this.store.snapshot().user.type;
      if (this.userType == 2 && this.userID != '') {
        if (this.auPairDetails.employer != "") {          
          this.getCurrentAuPairDetails();
          this.updateCoordinates();
        }
      }
    }, 6000);

     // Monitoring for upcoming activities
      const monInt = setInterval(() => {
      this.userID = this.store.snapshot().user.id;
      this.userType = this.store.snapshot().user.type;
      if (this.userType == 2 || this.userType == 1) {
        this.monitorActivities();
        clearInterval(monInt);
      }
    }, 6000);
  }

  /**
   * Notifications funtionality
   */
  monitorActivities() {
    //if parent, get childrens id's
    if (this.userType == 1) {
      this.getAcitivities(this.userID);
    }

    //if au pair, get parent id
    if (this.userType == 2 && this.auPairDetails.employer != "") {
      this.serv.getAuPair(this.userID).toPromise().then(res => {
        this.getAcitivities(res.employer);
      }).catch(err => {
        console.log(err);
      });
    }
  }

  setNotification() {
    const hour = Number(this.notificationToSend.time.substring(0, 2));
    const mins = Number(this.notificationToSend.time.substring(3));
    const day = Number(this.upcomingActivity.day);

    const intv = setInterval(async () => {
      const current = new Date();
      if (current.getHours() == hour && current.getMinutes() == mins && current.getDay() == day) {

        await this.serv.getFCMToken(this.store.snapshot().user.id).toPromise().then(res => {
          this.userFcmToken = res;
        }).catch(err => {
          console.log(err);
        });

        if (this.userFcmToken) {
          console.log(this.userFcmToken);
          const requestHeaders = new HttpHeaders().set('Authorization', 'key=AAAAlhtqIdQ:APA91bFlcYmdaqt5D_jodyiVQG8B1mkca2xGh6XKeMuTGtxQ6XKhSY0rdLnc0WrXDsV99grFamp3k0EVHRUJmUG9ULcxf-VSITFgwwaeNvrUq48q0Hn1GLxmZ3GBAYdCBzPFIRdbMxi9');
          const postData = {
            "to": this.userFcmToken,
            "notification": {
              "title": this.upcomingActivity.name,
              "body": this.upcomingActivity.description
            }
          }

          this.httpClient.post('https://fcm.googleapis.com/fcm/send', postData, { headers: requestHeaders }).subscribe(data => {
            console.log("data receieved: " + data);
          }, error => {
            console.log(error);
          });
          clearInterval(intv);
        }

        this.serv.logNotification(this.notificationToSend).toPromise().then(res => {
          console.log(res);
          this.monitorActivities();
        }, err => {
          console.log(err);
        });
      }

    }, 50000);
  }

  async getAcitivities(id: string) {
    let allChildren : Child[] = [];
    await this.serv.getChildren(id).toPromise().then(async res => {
      allChildren = res;
      for (let i = 0; i < allChildren.length; i++) {
        await this.serv.getSchedule(allChildren[i].id).toPromise().then(res => {
          const allActs : Activity[] = res;
          for (let j = 0; j < allActs.length; j++) {
            this.activities.push(allActs[j]);
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }).catch(err => {
      console.log(err);
    });
    
    this.activities.forEach(element => {
      const stringval = element.day;
      const intval = this.days.indexOf(stringval) + 1;
      element.day = String(intval);
      this.activitydays.push(intval);
    });

    //sort activitydays
    this.activitydays.sort((a, b) => a - b);

    //sort activities by day
    this.activities.sort((obj1, obj2) => {

      if (Number(obj1.day) > Number(obj2.day)) {
        return 1;
      }
      else
      if (Number(obj1.day) < Number(obj2.day)) {
        return -1;
      }
      else if(Number(obj1.day) == Number(obj2.day)){
        if(Number(obj1.timeStart.substring(0,2)) > Number(obj2.timeStart.substring(0,2))){
          return 1;
        }
        else if(Number(obj1.timeStart.substring(0,2)) < Number(obj2.timeStart.substring(0,2))){
          return -1;
        }
        else{
          return 0;
        }
      }

      return 0;
      
    });

    const current = new Date();
    const currentDay = current.getDay();

    if (this.activitydays.includes(currentDay)) {
      const act = this.activities.find(x => Number(x.day) == currentDay);
      //check hour first
      const hasPassed = this.activityHasFinished(act as Activity);

      if (!hasPassed) {        
        this.upcomingActivity = act as Activity;
      }
      else {
        //checking more than 1 activity on current day
        if (this.activities.filter(x => Number(x.day) == currentDay).length > 1){
          //getting the activities on the current day
          const filteredActs = this.activities.filter(x => Number(x.day) == currentDay);
          let updated = false;
          for(let i = 0; i < filteredActs.length; i++){
            //checking if the activity has passed
            if(!this.activityHasFinished(filteredActs[i])){
              this.upcomingActivity = filteredActs[i];
              updated = true;
              break;
              
            }
          }

          //all activities on current day has passed
          if(!updated){
            //check for activities later in the week
            const nextAct = this.activities.find(x => Number(x.day) > currentDay);
            this.upcomingActivity = nextAct as Activity;

            if(!nextAct){
              //no more activities in the week,set first activity of the week.
              this.upcomingActivity = this.activities[0] as Activity;
            }
          }
        }
        else {
          const nextAct = this.activities.find(x => Number(x.day) > currentDay);
          this.upcomingActivity = nextAct as Activity;
        }
      }
    }
    else {
      //find next activity within the week
      const nextAct = this.activities.find(x => Number(x.day) > currentDay);
      this.upcomingActivity = nextAct as Activity;

      if (this.upcomingActivity == undefined) {
        this.upcomingActivity = this.activities[0];
      }

    }

    const today = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate();
    if(this.userType == 1){
      this.serv.getParent(this.userID).toPromise().then(res => {
        this.notificationToSend.auPairId = res.auPair
      }).catch(err => {
        console.log(err);
      });
      this.notificationToSend.parentId = this.userID;
    }
    else if (this.userType == 2){
      this.notificationToSend.auPairId = this.userID;
      this.serv.getAuPair(this.userID).toPromise().then(res => {
        this.notificationToSend.parentId = res.employer;
      }, err => {
        console.log(err);
      });
    }
    this.notificationToSend.title = this.upcomingActivity.name;
    this.notificationToSend.body = this.upcomingActivity.description;
    this.notificationToSend.time = this.upcomingActivity.timeStart;
    this.notificationToSend.date = today;

    this.setNotification();
  }

  activityHasFinished(act : Activity) : boolean{
    let hasPassed = false;
    const current = new Date();
      if (current.getHours() > Number(act?.timeStart.slice(0, 2))) {
        hasPassed = true;
      }
      else if (current.getHours() == Number(act?.timeStart.slice(0, 2))) {
        //check minutes
        if (current.getMinutes() > Number(act?.timeStart.slice(3))) {
          hasPassed = true;
        }
      }
    return hasPassed;
  }
  
  notifications(){
    this.router.navigate(['/notifications']);
    this.menuClose();
  }

  /**
   * Live location tracking functionality
   */

  async getCurrentAuPairDetails() {
    const res = await this.serv.getAuPair(this.userID).toPromise()
    this.auPairDetails.id = res.id;
    this.auPairDetails.onShift = res.onShift;
    this.auPairDetails.employer = res.employer;
    this.auPairDetails.currentLong = res.currentLong;
    this.auPairDetails.currentLat = res.currentLat;
  };

  async updateCoordinates() 
  { 
    //Keep this as false unless testing live tracking features
    let flag = false;
    await this.geolocation.getCurrentPosition().then((resp: { coords: { longitude: number; latitude: number; }; }) => {
      //Check if auPair has actually moved
      if (this.auPairDetails.currentLong != resp.coords.longitude || this.auPairDetails.currentLat != resp.coords.latitude)
        flag = true;

      //Set new coords
      this.auPairDetails.currentLong = resp.coords.longitude;
      this.auPairDetails.currentLat = resp.coords.latitude;
      
      //Only update if coordinates have changed
      if(flag)
        this.updateAuPair(this.auPairDetails);
    }).catch((error) => 
    {
      console.log('Error getting location', error);
    });

  }

  async updateAuPair(aupair: auPair) 
  { 
    /**
     * Check if au pair is out of boundary
     */

    //Get all children for the au pair
    let allChildren: Child[] = [];
    await this.serv.getChildren(aupair.employer).toPromise().then(
    res => 
    {
      allChildren = res;
    }).catch(err => {console.log(err);});
    
    //Get all activities for the children
    this.currentActivities.splice(0);
    for (let i = 0; i < allChildren.length; i++) 
    {
      const child = allChildren[i];
      await this.serv.getSchedule(child.id).toPromise().then(
        res=>
        {
          res.forEach(( act : Activity) => 
          {
            this.currentActivities.push(act);  
          });
        }).catch(
          error=>
          {
            console.log("Error has occured with API: " + error);
          }
        );
    }

    /**
     * Find activities that are happening now
     * Loop thorugh all activities and find if the current time is in the timeslot, 
     * and check that the au pair is still within that activities boundary.
     * 
     * ** ALso Check if the au pair should still be on shift
     */

    const daysActivities: Activity[] = [];

    //Getting the current Time
    const time = new Date();
    const pipe = new DatePipe('en-US');
    const currentDay = pipe.transform(Date.now(),'EEEE');
    let currentHour = time.toLocaleString('en-US', { hour: 'numeric', hour12: false });
    let currentMinutes = time.toLocaleString('en-US', { minute: 'numeric', hour12: false });

    //Making hour and minutes correct format 
    if(currentHour.length == 1)
      currentHour = "0"+currentHour;
    if(currentMinutes.length == 1)
      currentMinutes = "0"+currentMinutes;

    for (let j = 0; j < this.currentActivities.length; j++)
    {
      //Getting the activities start time
      const act = this.currentActivities[j];
      const actTime = act.timeStart.substring(0,2);

      //Getting all the activities for the current day
      if(act.day.toLowerCase() == currentDay?.toLowerCase())
      {
        daysActivities.push(act);
      }

      //If the activity is currently happening, monitor the boundary and they are not already out of bounds
      if(actTime === currentHour && act.day.toLowerCase() == currentDay?.toLowerCase())
      {
        //Set the current activity
        this.currentActivityID = act.id;

        //Initially setting alreadyoutOfbounds to false for each new activity that starts (to avoid spam notifications for the same reason)
        if(this.previousActivityID != this.currentActivityID)
        {
          aupair.alreadyOutOfBounds = false;
        }

        const boundary = act.boundary;
        const longAct = act.longitude;
        const latAct = act.latitude;
        const longCoord = aupair.currentLong;
        const latCoord = aupair.currentLat;
        
        const distance = this.calculateEucDistance(latAct, longAct, latCoord, longCoord);
        if(distance>boundary  && !aupair.alreadyOutOfBounds)
        {
          console.log("Notifying parent");
          
          //Notify parent
          const current = new Date();
          const today = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate();
          const currentTime = currentHour + ":" + currentMinutes;
          this.outOfBoundsNotification.parentId = aupair.employer;
          this.outOfBoundsNotification.auPairId = "";
          this.outOfBoundsNotification.date = today;
          this.outOfBoundsNotification.time = currentTime;
          this.outOfBoundsNotification.title = "Au pair out of bounds!";
          this.outOfBoundsNotification.body = "Your au pair has left the boundary of " +act.boundary + "km for the activity '" + act.name + "' at " + act.location + ".  You au pair is currently " + distance + "km away.";
          await this.serv.logNotification(this.outOfBoundsNotification).toPromise().then(res => 
          {
            console.log(res);
          }, err => {
            console.log(err);
          });

          //Notify au pair
          this.outOfBoundsNotification.parentId = "";
          this.outOfBoundsNotification.auPairId = aupair.id;
          this.outOfBoundsNotification.date = today;
          this.outOfBoundsNotification.time = currentTime;
          this.outOfBoundsNotification.title = "Out of bounds for activity!";
          this.outOfBoundsNotification.body = "You have left the boundary of " +act.boundary + "km for the activity '" + act.name + "' at " + act.location 
          + ".  You employer has also been notified of this activity";
          await this.serv.logNotification(this.outOfBoundsNotification).toPromise().then(res => 
          {
            console.log(res);
          }, err => {
            console.log(err);
          });

          //Setting already out of bounds so that it doesnt spam notifications
          aupair.alreadyOutOfBounds = true;
        }
        this.previousActivityID = act.id;
      }
    }

    //Checking if the au pair should be on shift or not
    let startTime = 24;
    let endTime = 0;
    for (let k = 0; k < daysActivities.length; k++) 
    {
      const act = daysActivities[k];
      const actStartTime = parseInt(act.timeStart.substring(0,2));
      const actEndTime = parseInt(act.timeEnd.substring(0,2));

      //Finding the earliest activity's start
      if(actStartTime < startTime)
        startTime = actStartTime

      //Finding the latest activity end
      if(actEndTime > endTime)
        endTime = actEndTime
    }
    
    if(!isNaN(parseInt(currentHour)) && parseInt(currentHour)>=endTime)
    {
      aupair.onShift = false;
      aupair.alreadyOutOfBounds = false; //Cant be out of bounds if not working
    }
    else if(!isNaN(parseInt(currentHour)) && parseInt(currentHour)>=startTime && parseInt(currentHour)<endTime)
    {
      aupair.onShift = true;
    }

    //Save new auPair object in the database with updated coordinates
    this.serv.editAuPair(aupair).subscribe(
      res => {
        return res;
      },
      error => {
        console.log("Error has occured with API: " + error);
        return error;
      }
    )
  }

  calculateEucDistance(actX : number, actY : number, aupairX : number, aupairY : number)
  {
    const x1 = (actX * Math.PI) / 180;
    const y1 = (actY * Math.PI) / 180;
    const x2 = (aupairX * Math.PI) / 180;
    const y2 = (aupairY * Math.PI) / 180;

    const dlong = y1 - y2;
    const dlat = x1 - x2;

    let distanceKM = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(x2) * Math.cos(x1) * Math.pow(Math.sin(dlong / 2), 2);
    distanceKM = 2 * Math.asin(Math.sqrt(distanceKM));
    distanceKM = distanceKM * 6371;
    return distanceKM;
  }

  /**
   * Navbar functionality
   */

  dash(type=this.store.snapshot().user.type)
  {
    if(type == 0)
    {
      this.router.navigate(['/admin-console']);
      this.menuClose();
    }
    else if(type == 1)
    {
      this.router.navigate(['/parent-dashboard']);
      this.menuClose();
    }
    else if(type == 2)
    {
      this.router.navigate(['/au-pair-dashboard']);
      this.menuClose();
    }
  }

  profile(type=this.store.snapshot().user.type )
  {
    console.log("Coming into profile function")
    if(type == 0)
    {
      // this.router.navigate(['/admin-profile']);
    }
    else if(type == 1)
    {
      this.router.navigate(['/parent-profile']);
      this.menuClose();
    }
    else if(type == 2)
    {
      this.router.navigate(['/au-pair-profile']);
      this.menuClose();
    }
  }

  menuOpen()
  {
    this.menController.open('start');
  }

  menuClose()
  {
    this.menController.close('start');
  }

  logout()
  {
    this.store.dispatch(new Reset());
    this.router.navigate(['/login-page']);
    this.menuClose();
  }

  reports(type=this.store.snapshot().user.type) 
  {
    if(type == 0)
    {
      this.router.navigate(['/admin-reports']);
      this.menuClose();
    }
  }

  explore(){
    if (this.store.snapshot().user.children.length < 1){
      this.openToast('You need to have children added to your profile in order to hire an Au Pair');
      this.menuClose();
    }
    else if(this.store.snapshot().user.auPair != "")
    {
      this.openToast('You already have an Au Pair employed');
      this.menuClose();
    }
    else
    {
      this.router.navigate(['/explore']);
      this.menuClose();
    }
  }

  async openToast(message: string)
  {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }
}
