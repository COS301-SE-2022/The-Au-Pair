import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { auPair, Child, Parent, User } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-job-summary-au-pair-view',
  templateUrl: './job-summary-au-pair-view.component.html',
  styleUrls: ['./job-summary-au-pair-view.component.scss'],
})
export class JobSummaryAuPairViewComponent implements OnInit {
  
  auPairID = "";
  childrenArr: Child[] = [];

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
    terminateDate: "",
  }

  childDetails: Child ={
    id: "",
    fname: "",
    sname: "",
    allergies: "",
    diet: "",
    parent: "",
    aupair: "",
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

  constructor(private serv: API, private store: Store) {}

  async ngOnInit(): Promise<void> {
    this.auPairID = this.store.snapshot().user.id;
    
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
    let total = 0;
    for(let i = 0; i < ratings.length; i++)
    {
      total += ratings[i];
    }

    const avg = total/ratings.length;

    let ret = (Math.round(avg * 100) / 100).toFixed(1);

    return ret;
  }
}

