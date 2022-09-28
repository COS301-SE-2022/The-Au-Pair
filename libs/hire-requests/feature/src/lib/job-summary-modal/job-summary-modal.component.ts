import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { auPair, Child, Email, Parent, User, Notification } from '../../../../../shared/interfaces/interfaces';
import { API } from '../../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SetImgString } from '../../../../../shared/ngxs/actions';

@Component({
  selector: 'the-au-pair-job-summary-modal',
  templateUrl: './job-summary-modal.component.html',
  styleUrls: ['./job-summary-modal.component.scss'],
})
export class JobSummaryModalComponent implements OnInit {
  public navParams = new NavParams;
  parentID: string = this.navParams.get('parentID');
  contractID: string = this.navParams.get('contractID');
  auPairID = "";
  userFcmToken = "";

  childrenArr: Child[] = [];

  days = [
    "Mon","Tue","Wed","Thu","Fri","Sat","Sun"
  ];

  children : any;
  childActivities : any[] = [];

  shiftHours: number[] = [];
  shiftRangeMin: string[] = [];
  shiftRangeMax: string[] = [];

  auPairChildren: string[] = [];

  currentAuPair: auPair = {
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

  hasImage = false;
  src = "";

  notificationToSend: Notification = {
    id: "",
    auPairId: "",
    parentId: "",
    title: "",
    body: "",
    date: "",
    time: "",
  }

  childDetails: Child ={
    id: "",
    fname: "",
    sname: "",
    dob: "",
    allergies: "",
    diet: "",
    parent: "",
    aupair: ''
  }

  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
    rating: []
  }

  userDetails: User = {
    id: '',
    fname: '',
    sname: '',
    email: '',
    address: '',
    registered: false,
    type: 0,
    password: '',
    number: '',
    salt: '',
    latitude: 0,
    longitude: 0,
    suburb: "",
    gender: "",
    fcmToken : "",
    birth: "",
    warnings: 0,
    banned: "",
  }

  activities: any;

  emailRequest : Email = {
    to: "",
    subject: "",
    body: "",
  }

  constructor(private serv: API, private modalCtrl : ModalController, private store: Store, private router: Router, public toastCtrl: ToastController, private httpClient: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.auPairID = this.store.snapshot().user.id;
    this.setImage();
    await this.getParentDetails(this.parentID);
    await this.getUserDetails();
    await this.getChildrenDetails();
    await this.getActivities();
  }

  async getActivities(){
    await this.serv.getChildren(this.parentID).subscribe(
      res => {
          this.children = res;
          this.children.forEach((element: { id: string; }) => {
          this.auPairChildren.push(element.id);
        });
        this.serv.getAuPairSchedule(this.auPairChildren).subscribe(
          res=>{
            this.activities = res;
            this.setChildActivity();
          }
        );
      },
      error => { console.log("Error has occured with API: " + error); },
    );
  }

  setChildActivity(){    
    this.children.forEach((child: { id: any; fname: any; }) => {
      this.activities.forEach((act: { childId: any; child: any; name: any; id: any; timeStart: any; day: any; }) => {
        if(child.id === act.child){
          const childActivity = {
            childName : child.fname,
            childId : act.child,
            activityName : act.name,
            activityId : act.id,
            time : act.timeStart,
            dayofweek : act.day,
          }
          this.childActivities.push(childActivity);
        }
      });
    });

    let actCount = 0;
    let minTime = "23:59";
    let maxTime = "00:00";

    const actDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    for(let i = 0; i < actDays.length; i++)
    {
      actCount = 0;
      minTime = "23:59";
      maxTime = "00:00";

      this.activities.forEach((act: {timeStart: any; day: any; timeEnd: any;}) => 
      {
        if(act.day === actDays[i])
        {
          actCount++;
          
          if(act.timeStart <= minTime)
          {
            minTime = act.timeStart;
          }

          if(act.timeEnd >= maxTime)
          {
            maxTime = act.timeEnd;
          }
        }
      });
      this.shiftHours[i] = actCount;
      this.shiftRangeMin[i] = minTime;
      this.shiftRangeMax[i] = maxTime;
    }  
  }

  async getUserDetails()
  {
    await this.serv.getUser(this.parentID).toPromise()
    .then( 
      res=>{
        this.userDetails.id = res.id;
        this.userDetails.fname = res.fname;
        this.userDetails.sname = res.sname;
        this.userDetails.email = res.email;
        this.userDetails.address = res.address;
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
  }

  async getChildrenDetails()
  {
    await this.serv.getChildren(this.parentID).toPromise()
    .then( 
      res=>{
        this.childrenArr = res;
      },
      error =>{console.log("Error has occured with API: " + error);}
    )
  }

  async sucToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Request has been accepted!',
      duration: 1000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  async acceptRequest()
  {
    this.sucToast();    

    await this.getAuPairDetails();
    await this.getParentDetails(this.parentID);
    await this.addChildrenAuPair(this.parentID);

    this.currentAuPair.employer = this.parentID;
    this.parentDetails.auPair = this.auPairID;    

    await this.updateAuPair();
    await this.updateParent();

    this.serv.removeContract(this.contractID).subscribe(
      async res=>{
        console.log(res);
        //send email to parent to notify them that the request has been accepted
        this.emailRequest.to = this.userDetails.email;
        this.emailRequest.subject = "Au Pair Hire Request Accepted";
        this.emailRequest.body = this.store.snapshot().user.name + " has accepted your request to be your au pair. You should be able to see them on your dashboard once you log into the application again." +
                                                                   "\n\nRegards,\nThe Au Pair Team";

        await this.serv.sendEmail(this.emailRequest).toPromise().then(
          res=>{
            console.log(res);
          },
          error => {
            console.log("Error has occured with API: " + error);
          }
        );
        this.router.navigate(['/au-pair-dashboard']).then(()=>{
        location.reload();
        });

        await this.serv.getFCMToken(this.parentID).toPromise().then(res => {
          this.userFcmToken = res;
        }).catch(err => {
          console.log(err);
        });

        if (this.userFcmToken != "") {
          console.log(this.userFcmToken);
          const requestHeaders = new HttpHeaders().set('Authorization', 'key=AAAAlhtqIdQ:APA91bFlcYmdaqt5D_jodyiVQG8B1mkca2xGh6XKeMuTGtxQ6XKhSY0rdLnc0WrXDsV99grFamp3k0EVHRUJmUG9ULcxf-VSITFgwwaeNvrUq48q0Hn1GLxmZ3GBAYdCBzPFIRdbMxi9');
          const postData = {
            "to": this.userFcmToken,
            "notification": {
              "title": "Hire Request Accepted",
              "body": this.store.snapshot().user.name + " has accepted your hire request.",
            }
          }

          this.httpClient.post('https://fcm.googleapis.com/fcm/send', postData, { headers: requestHeaders }).subscribe(data => {
            console.log("data receieved: " + data);
          }, error => {
            console.log(error);
          });
        }
      console.log(res);

      const current = new Date();
      const minutes = String(current.getMinutes()).padStart(2, '0');

      this.notificationToSend.auPairId = "";
      this.notificationToSend.parentId = this.parentID;
      this.notificationToSend.title = "Hire Request Accepted";
      this.notificationToSend.body = this.store.snapshot().user.name + " has accepted your hire request.";
      this.notificationToSend.date = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate();
      this.notificationToSend.time = current.getHours() + ":" + minutes;

      this.serv.logNotification(this.notificationToSend).toPromise().then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
      },
      error=>{console.log("Error has occured with API: " + error);}
    )

    this.closeModal();
  }

  async rejectRequest()
  {
    await this.serv.removeContract(this.contractID).subscribe(
      async res=>{
        console.log(res);
        this.emailRequest.to = this.userDetails.email;
        this.emailRequest.subject = "Au Pair Hire Request Rejected";
        this.emailRequest.body = this.store.snapshot().user.name + " has rejected your request to be your au pair. Feel free to explore more au pairs on our app's explore page!" +
                                                                   "\n\nRegards,\nThe Au Pair Team";

        await this.serv.sendEmail(this.emailRequest).toPromise().then(
          res=>{
            console.log(res);
          },
          error => {
            console.log("Error has occured with API: " + error);
          }
        );
        location.reload();
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  async getAuPairDetails()
  {
    await this.serv.getAuPair(this.auPairID)
    .toPromise()
      .then(
      res=>{
        this.currentAuPair.id = res.id;
        this.currentAuPair.rating = res.rating;
        this.currentAuPair.onShift = res.onShift;
        this.currentAuPair.employer = res.employer;
        this.currentAuPair.costIncurred = res.costIncurred;
        this.currentAuPair.distTraveled = res.distTraveled;
        this.currentAuPair.payRate = res.payRate;
        this.currentAuPair.bio = res.bio;
        this.currentAuPair.experience = res.experience;
        this.currentAuPair.currentLong = res.currentLong;
        this.currentAuPair.currentLat = res.currentLat;
        this.currentAuPair.terminateDate = res.terminateDate;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  async getParentDetails(parentID : string)
  {
    await this.serv.getParent(parentID)
    .toPromise()
      .then( 
        res=>{
          this.parentDetails.id = res.id;      
          this.parentDetails.children = res.children;
          this.parentDetails.medID = res.medID;
          this.parentDetails.auPair = res.auPair;
          this.parentDetails.rating = res.rating;
      },
      error => {
        console.log("Error has occured with API: " + error);
      }
    )
  }

  async addChildrenAuPair(parent : string)
  {
     await this.serv.getChildren(parent)
     .toPromise()
     .then(
       res=>{        
         for(let i = 0; i < res.length; i++)
         {
           this.childDetails.id = res[i].id;
           this.childDetails.fname = res[i].fname;
           this.childDetails.sname = res[i].sname;
           this.childDetails.allergies = res[i].allergies;
           this.childDetails.diet = res[i].diet;
           this.childDetails.parent = res[i].parent;
           this.childDetails.dob = res[i].dob;
           this.childDetails.aupair = this.auPairID;
 
           this.updateChild(this.childDetails);
         }
       },
       error => {
         console.log("Error has occured with API: " + error);
       }
     ) 
  }

  async updateAuPair(){
    await this.serv.editAuPair(this.currentAuPair).toPromise()
    .then(
      res=>{
        console.log("The response is:" + res);
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    );
  }

  async updateParent(){
    await this.serv.editParent(this.parentDetails).toPromise()
    .then(
      res=>{
        console.log("The response is:" + res);
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    );
  }

  async updateChild(child : Child){
    await this.serv.updateChild(child).toPromise()
    .then(
      res=>{
        console.log("The response is:" + res);
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    )
  }

  closeModal()
  {
    this.modalCtrl.dismiss();
  }

  getAverage(ratings : number[])
  {
    if(ratings.length == 0)
    {
      return 0;
    }

    let total = 0;
    for(let i = 0; i < ratings.length; i++)
    {
      total += ratings[i];
    }

    const avg = total/ratings.length;

    if(avg < 1 || avg > 5)
    {
      return 0;
    }

    if((avg % 1) == 0)
    {
      return avg;
    }

    const ret = (Math.round(avg * 100) / 100).toFixed(1);

    return ret;
  }

  getAge(dateString : string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
  }

  async setImage(){
    await this.serv.getFile(this.parentID  +  ".png").toPromise().then(
      async res=>{
        if (res.size > 0){
          const dataType = res.type;
          const binaryData = [];
          binaryData.push(res);
          const href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          this.store.dispatch(new SetImgString(href));
          const dom = document.getElementById("img8");

          if(dom != null)
          {
            dom.setAttribute("src", this.store.snapshot().user.imgString);
          }

          this.hasImage = true;
        }
        else{
          const dom = document.getElementById("img8");
          if (dom != null) {
            dom.setAttribute("src","assets/images/placeholder-profile.jpg");
          }
          this.hasImage = true;
        }
      },
      error=>{
        return error;
      }
    );
  }
}
