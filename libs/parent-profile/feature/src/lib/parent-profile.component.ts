import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { User, Parent, medAid } from '../../../../shared/interfaces/interfaces';
import { Store } from '@ngxs/store';
import { SetImgString } from '../../../../shared/ngxs/actions';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'the-au-pair-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.scss'],
})
export class ParentProfileComponent implements OnInit {

  parentID = "";

  hasImage = false;
  src = "";

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


  constructor(private serv: API, private store: Store,private sanatizer : DomSanitizer){}

  ngOnInit(): void
  {
    this.setImage();
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
        this.parentDetails.rating = res.rating;
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

  async setImage(){
    await this.serv.getFile(this.store.snapshot().user.id  +  ".png").toPromise().then(
      async res=>{
        const dataType = res.type;
        const binaryData = [];
        binaryData.push(res);
        const href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        this.store.dispatch(new SetImgString(href));
        const dom = document.getElementById("img1");

        if(dom != null)
        {
          dom.setAttribute("src", this.store.snapshot().user.imgString);
        }

        this.hasImage = true;
      },
      error=>{
        const dom = document.getElementById("img1");
        if (dom != null) {
          dom.setAttribute("src","assets/images/placeholder-profile.jpg");
        }
        this.hasImage = true;
        return error;
      }
    );
  }

}
