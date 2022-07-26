import { Component, OnInit } from '@angular/core';
import { User, auPair } from '../../../../shared/interfaces/interfaces';
import { API } from '../../../../shared/api/api.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-au-pair-profile',
  templateUrl: './au-pair-profile.component.html',
  styleUrls: ['./au-pair-profile.component.scss'],
})
export class AuPairProfileComponent implements OnInit {

  aupairID = "";
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
    age: 0,
  }

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
  }

  constructor(private serv: API, private store: Store){}

  ngOnInit(): void
  {
    this.aupairID = this.store.snapshot().user.id;
    this.getUserDetails()
  }

  async getUserDetails()
  {
    /* User Details */
    await this.serv.getUser(this.aupairID)
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
        this.userDetails.salt = res.salt;
        this.userDetails.latitude = res.latitude;
        this.userDetails.longitude = res.longitude;
        this.userDetails.suburb = res.suburb;
        this.userDetails.gender = res.gender;
        this.userDetails.age = res.age;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )

    await this.serv.getAuPair(this.aupairID)
    .toPromise()
    .then(
      res=>{
        this.auPairDetails.id = res.id;
        this.auPairDetails.rating = res.rating;
        this.auPairDetails.onShift = res.onShift;
        this.auPairDetails.employer = res.employer;
        this.auPairDetails.costIncurred = res.costIncurred;
        this.auPairDetails.distTraveled = res.distTraveled;
        this.auPairDetails.payRate = res.payRate;
        this.auPairDetails.bio = res.bio;
        this.auPairDetails.experience = res.experience;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  };
}
