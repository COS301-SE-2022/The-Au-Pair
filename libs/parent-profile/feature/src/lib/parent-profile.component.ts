import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { User, Parent, medAid } from '../../../../shared/interfaces/interfaces';
import { Store } from '@ngxs/store';
@Component({
  selector: 'the-au-pair-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.scss'],
})
export class ParentProfileComponent implements OnInit {

  parentID = "";

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

  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
  }

  medAidDetails: medAid = {
    id: "",
    plan: "",
    name: "",
    sname: "",
    mID: "",
    provider: "",
  }


  constructor(private serv: API, private store: Store){}

  ngOnInit(): void
  {
    this.parentID = this.store.snapshot().user.id;
    this.getUserDetails()
  }

  async getUserDetails()
  {
    /* User Details */
    await this.serv.getUser(this.parentID)
    .toPromise()
    .then(
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

    await this.serv.getParent(this.parentID)
    .toPromise()
    .then(
      res=>{
        this.parentDetails.id = res.id;
        this.parentDetails.children = res.children;
        this.parentDetails.medID = res.medID;
        this.parentDetails.auPair = res.auPair;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )

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
  };
}
