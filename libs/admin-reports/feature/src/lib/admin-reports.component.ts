import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/interfaces/interfaces';
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
    fcmToken: "",
  }

  

  constructor(private serv: API) {}

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.serv.getAllReports().toPromise().then(res => {
      this.reports = res;

      for(let i = 0; i < this.reports.length; i++) {
        this.serv.getUser(this.reports[i].auPairId).toPromise().then(dat => {
          
          this.reports[i].fname = dat.fname;
          this.reports[i].sname = dat.sname;
          this.reports[i].email = dat.email;
          this.reports[i].address = dat.address;
          this.reports[i].registered = dat.registered;
          this.reports[i].type = dat.type;
          this.reports[i].password = dat.password;
          this.reports[i].number = dat.number;
          this.reports[i].salt = dat.salt;
          this.reports[i].latitude = dat.latitude;
          this.reports[i].longitude = dat.longitude;
          this.reports[i].suburb = dat.suburb;
          this.reports[i].gender = dat.gender;
          this.reports[i].birth = dat.birth;
          this.reports[i].warnings = dat.warnings;
          this.reports[i].banned = dat.banned;
          this.reports[i].fcmToken = dat.fcmToken;

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

  dismiss(reportId : any) {
    this.serv.deleteReport(reportId.id).toPromise().then(res => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });
  }

  warn(customReport : any) {
    this.userDetails.id = customReport.auPairId;
    this.userDetails.fname = customReport.fname;
    this.userDetails.sname = customReport.sname;
    this.userDetails.email = customReport.email;
    this.userDetails.address = customReport.address;
    this.userDetails.registered = customReport.registered;
    this.userDetails.type = customReport.type;
    this.userDetails.password = customReport.password;
    this.userDetails.number = customReport.number;
    this.userDetails.salt = customReport.salt;
    this.userDetails.latitude = customReport.latitude;
    this.userDetails.longitude = customReport.longitude;
    this.userDetails.suburb = customReport.suburb;
    this.userDetails.gender = customReport.gender;
    this.userDetails.birth = customReport.birth;
    this.userDetails.fcmToken = customReport.fcmToken;
    this.userDetails.warnings = customReport.warnings;
    this.userDetails.warnings += 1;

    if(this.userDetails.warnings > 3) {
      this.userDetails.banned = "Due to receiving more than 3 warnings";
    }

    this.serv.editUser(this.userDetails).toPromise().then(res => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });

    this.serv.deleteReport(customReport.id).toPromise().then(res => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });

    // To make sure that the user id doesn't somehow stay afterwards
    this.userDetails.id = "";
  }

  ban(customReport : any) {
    
    this.userDetails.id = customReport.auPairId;
    this.userDetails.fname = customReport.fname;
    this.userDetails.sname = customReport.sname;
    this.userDetails.email = customReport.email;
    this.userDetails.address = customReport.address;
    this.userDetails.registered = customReport.registered;
    this.userDetails.type = customReport.type;
    this.userDetails.password = customReport.password;
    this.userDetails.number = customReport.number;
    this.userDetails.salt = customReport.salt;
    this.userDetails.latitude = customReport.latitude;
    this.userDetails.longitude = customReport.longitude;
    this.userDetails.suburb = customReport.suburb;
    this.userDetails.gender = customReport.gender;
    this.userDetails.birth = customReport.birth;
    this.userDetails.fcmToken = customReport.fcmToken;
    this.userDetails.warnings = customReport.warnings;
    this.userDetails.banned = "Due to violation of community guidelines";

    this.serv.editUser(this.userDetails).toPromise().then(res => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });

    this.serv.deleteReport(customReport.id).toPromise().then(res => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });

    // To make sure that the user id doesn't somehow stay afterwards
    this.userDetails.id = "";
  }



}
