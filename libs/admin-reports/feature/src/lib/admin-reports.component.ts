import { Component, OnInit } from '@angular/core';
import { API } from "../../../../shared/api/api.service";

@Component({
  selector: 'the-au-pair-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss'],
})
export class AdminReportsComponent implements OnInit {
  
  reports : any[] = [];

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
          this.reports[i].fname = dat.fname;
          this.reports[i].sname = dat.sname;
          this.reports[i].id = dat.id;
          this.reports[i].email = dat.email;
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

  resolve(userId : string, choice : boolean) {
    // this.serv.resolveApplication(userId,choice).toPromise().then(res => {
    //   window.location.reload();
    //   return choice;
    // }).catch(err => {
    //   console.log(err);
    // });
  }

}
