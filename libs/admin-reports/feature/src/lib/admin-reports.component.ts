import { Component, OnInit } from '@angular/core';
import { User } from 'libs/shared/interfaces/interfaces';
import { API } from "../../../../shared/api/api.service";

@Component({
  selector: 'the-au-pair-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss'],
})
export class AdminReportsComponent implements OnInit {
  
  user : any[] = [];
  reports : any[] = [];

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
    birth: "",
    warnings: 0,
    banned: "",
  }

  

  constructor(private serv: API) {}

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.serv.getAllReports().toPromise().then(res => {
      // console.log(res);
      this.reports = res;

      for(let i = 0; i < this.reports.length; i++) {
        this.serv.getUser(this.reports[i].auPairId).toPromise().then(dat => {

          this.user[i] = dat;
          this.reports[i].auPair = this.user[i];

          // this.reports[i].fname = dat.fname;
          // this.reports[i].sname = dat.sname;
          // this.reports[i].email = dat.email;
          // this.reports[i].warnings = dat.warnings;
          // this.reports[i].banned = dat.banned;
        }).catch(err => {
          console.log(err);
        });
      }

    }).catch(err => {
      console.log(err);
    });
  }

  getAuPair(id : string) {
    let outp = null;
    this.serv.getAuPair(id).toPromise().then(res => {
      outp = res;
    }).catch(err => {
      console.log(err);
    });
    
    return outp;
  }

  dismiss(reportId : string) {
    this.serv.deleteReport(reportId).toPromise().then(res => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });
  }

  warn(reportId : string, user : any) {
    this.userDetails.id = user.id;
    this.userDetails.fname = user.fname;
    this.userDetails.sname = user.sname;
    this.userDetails.email = user.email;
    this.userDetails.address = user.address;
    this.userDetails.registered = user.registered;
    this.userDetails.type = user.type;
    this.userDetails.password = user.password;
    this.userDetails.number = user.number;
    this.userDetails.salt = user.salt;
    this.userDetails.latitude = user.latitude;
    this.userDetails.longitude = user.longitude;
    this.userDetails.suburb = user.suburb;
    this.userDetails.gender = user.gender;
    this.userDetails.birth = user.birth;
    this.userDetails.warnings = user.warnings + 1;

    if(user.warnings > 3) {
      this.userDetails.banned = "Due to receiving more than 3 warnings";
    }

    this.serv.deleteReport(reportId).toPromise().then(res => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });

    // To make sure that the user id doesn't somehow stay afterwards
    this.userDetails.id = "";
  }

  ban(reportId : string, user : any) {
    
    this.userDetails.id = user.id;
    this.userDetails.fname = user.fname;
    this.userDetails.sname = user.sname;
    this.userDetails.email = user.email;
    this.userDetails.address = user.address;
    this.userDetails.registered = user.registered;
    this.userDetails.type = user.type;
    this.userDetails.password = user.password;
    this.userDetails.number = user.number;
    this.userDetails.salt = user.salt;
    this.userDetails.latitude = user.latitude;
    this.userDetails.longitude = user.longitude;
    this.userDetails.suburb = user.suburb;
    this.userDetails.gender = user.gender;
    this.userDetails.birth = user.birth;
    this.userDetails.warnings = user.warnings;
    this.userDetails.banned = "Due to violation of community guidelines";

    this.serv.editUser(this.userDetails).toPromise().then(res => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });

    this.serv.deleteReport(reportId).toPromise().then(res => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });

    // To make sure that the user id doesn't somehow stay afterwards
    this.userDetails.id = "";
  }



}
