import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API } from '../../../../libs/shared/api/api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Activity, auPair, Parent, Notification, Child } from '../../../../libs/shared/interfaces/interfaces';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Reset } from '../../../../libs/shared/ngxs/actions';

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
    timeStart: '',
    timeEnd: '',
    budget: 0,
    comment: '',
    behavior: 0,
    day: '',
    child: '',
  }

  activities: Activity[] = [];

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


    this.monitorActivities();
  }

  ngOnInit(): void {
    this.menController.swipeGesture(false);
    //Only update coordinates if you are an au pair
    setInterval(() => {
      this.userID = this.store.snapshot().user.id;
      this.userType = this.store.snapshot().user.type;
      if (this.userType == 2 && this.userID != '') {
        if (this.auPairDetails.onShift == true) {
          this.getCurrentAuPairDetails();
          this.updateCoordinates();
        }
      }
    }, 10000);

    const monInt = setInterval(() => {
      this.userID = this.store.snapshot().user.id;
      this.userType = this.store.snapshot().user.type;
      if (this.userType == 2 || this.userType == 1) {
        this.monitorActivities();
        clearInterval(monInt);
      }
    }, 6000);
  }

  monitorActivities() {
    //if parent, get childrens id's
    if (this.userType == 1) {
      this.getAcitivities(this.userID);
    }

    //if au pair, get parent id
    if (this.userType == 2) {
      this.serv.getAuPair(this.userID).toPromise().then(res => {
        this.getAcitivities(res.employer)
      }).catch(err => {
        console.log(err);
      });
    }
  }

  setNotification() {
    const hour = Number(this.notificationToSend.time.substring(0, 2));
    const mins = Number(this.notificationToSend.time.substring(3));
    const day = Number(this.upcomingActivity.day);

    const intv = setInterval(() => {
      const current = new Date();
      if (current.getHours() == hour && current.getMinutes() == mins && current.getDay() == day) {


        if (this.userFcmToken) {
          const requestHeaders = new HttpHeaders().set('Authorization', 'key=AAAAlhtqIdQ:APA91bFlcYmdaqt5D_jodyiVQG8B1mkca2xGh6XKeMuTGtxQ6XKhSY0rdLnc0WrXDsV99grFamp3k0EVHRUJmUG9ULcxf-VSITFgwwaeNvrUq48q0Hn1GLxmZ3GBAYdCBzPFIRdbMxi9');
          const postData = {
            "to": "e7q50QKSR0I1_Wenw7Hdll:APA91bE2_LMf6MAfCmBAsSye4f9vLIvXWt5c4lKrKdamNsf5lyLoefH6_qbN-3psEh2EIQWcnzw0VbN6x8mfpC0cosQnOqC5-OdPEyg_8EeKJB6F0tBGNRIq5YNiGjem5AnZcV7xqm0Fg",
            "notification": {
              "title": "Order #44",
              "body": "Hello bro"
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
    await this.serv.getChildren(id).toPromise().then(res => {
      res.forEach((element: Child) => {
        this.serv.getSchedule(element.id).toPromise().then(res => {
          res.forEach((element: Activity) => {
            if (this.activities.find(x => x.id == element.id) == undefined) {
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
        if (this.activities.filter(x => Number(x.day) == currentDay).length > 1){
          const filteredActs = this.activities.filter(x => Number(x.day) == currentDay);
          let updated = false;
          for(let i = 1; i < filteredActs.length; i++){
            if(!this.activityHasFinished(filteredActs[i])){
              this.upcomingActivity = filteredActs[i];
              updated = true;
              break;
              
            }
          }

          if(!updated){
            const nextAct = this.activities.find(x => Number(x.day) > currentDay);
            this.upcomingActivity = nextAct as Activity;
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

  async getCurrentAuPairDetails() {
    const res = await this.serv.getAuPair(this.userID).toPromise()
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
  };

  async updateCoordinates() {
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

  updateAuPair(aupair: auPair) {
    //Save new auPair object in the database
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

  //Navbar functions
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

  notifications(){
    this.router.navigate(['/notifications']);
    this.menuClose();
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
