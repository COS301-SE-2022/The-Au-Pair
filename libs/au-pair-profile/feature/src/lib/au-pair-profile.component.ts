import { Component, OnInit } from '@angular/core';
import { User, AuPair, medAid } from '../../../../shared/interfaces/interfaces';
import { API } from '../../../../shared/api/api.service';

@Component({
  selector: 'the-au-pair-au-pair-profile',
  templateUrl: './au-pair-profile.component.html',
  styleUrls: ['./au-pair-profile.component.scss'],
})
export class AuPairProfileComponent implements OnInit {

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
  }

  auPairDetails: AuPair = {
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

  medAidDetails: medAid = {
    id: "",
    plan: "",
    name: "",
    sname: "",
    mID: "",
    provider: "",
  }


  constructor(private serv: API){}

  ngOnInit(): void
  {
    this.getUserDetails()
  }

  async getUserDetails()
  {
    /* User Details */
    await this.serv.getUser("7542108615984").subscribe(
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
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
      await this.serv.getAuPair("7542108615984").subscribe(
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
