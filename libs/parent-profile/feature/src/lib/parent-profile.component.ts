import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { User, Parent, medAid } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.scss'],
})
export class ParentProfileComponent implements OnInit {

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

  parentDetails: Parent = {
    id: "",
    cildren: [],
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


  constructor(private serv: API)
  {

  }

  ngOnInit(): void
  {
    this.getUserDetails()
  }

  async getUserDetails()
  {
    /* User Details */
    await this.serv.getUser("4561237814867").subscribe(
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
      await this.serv.getParent("4561237814867").subscribe(
        res=>{
          this.parentDetails.id = res.id;
          this.parentDetails.cildren = res.cildren;
          this.parentDetails.medID = res.medID;
          this.parentDetails.auPair = res.auPair;
        },
        error=>{console.log("Error has occured with API: " + error);}
      )
      await this.serv.getMedAid("7534286951").subscribe(
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
