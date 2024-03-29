import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { SetImgString } from '../../../../shared/ngxs/actions';
import { auPair, Child, medAid, Parent, User } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-job-summary-au-pair-view',
  templateUrl: './job-summary-au-pair-view.component.html',
  styleUrls: ['./job-summary-au-pair-view.component.scss'],
})
export class JobSummaryAuPairViewComponent implements OnInit {
  
  auPairID = "";
  childrenArr: Child[] = [];

  hasImage = false;
  src = "";

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

  medAidDetails: medAid = {
    id: "",
    plan: "",
    name: "",
    sname: "",
    mID: "",
    provider: "",
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

  constructor(private serv: API, private store: Store) {}

  async ngOnInit(): Promise<void> {
    this.auPairID = this.store.snapshot().user.id;
    
    await this.getAuPairDetails();
    this.setImage();
    await this.getParentDetails();
    await this.getMedAidDetails();
    await this.getUserDetails();
    await this.getChildrenDetails();
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

  async getMedAidDetails()
  {
    await this.serv.getMedAid(this.parentDetails.medID)
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
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  async getParentDetails()
  {
    await this.serv.getParent(this.currentAuPair.employer)
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

  async getUserDetails()
  {
    await this.serv.getUser(this.parentDetails.id).toPromise()
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
    await this.serv.getChildren(this.parentDetails.id).subscribe(
      res=>{
        let i = 0;
        res.forEach((element: Child) => {
          this.childrenArr[i++] = element;
        });
      },
      error =>{console.log("Error has occured with API: " + error);}
    )
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
    await this.serv.getFile(this.currentAuPair.employer +  ".png").toPromise().then(
      async res=>{
        if (res.size > 0) {
          const dataType = res.type;
          const binaryData = [];
          binaryData.push(res);
          const href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          this.store.dispatch(new SetImgString(href));
          const dom = document.getElementById("img9");

          if(dom != null)
          {
            dom.setAttribute("src", this.store.snapshot().user.imgString);
          }

          this.hasImage = true;
        }
        else{
          const dom = document.getElementById("img9");
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

