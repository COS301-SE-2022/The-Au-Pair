import { Component, OnInit } from '@angular/core';
import { API } from "../../../../shared/api/api.service";

@Component({
  selector: 'the-au-pair-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss'],
})
export class AdminReportsComponent implements OnInit {
  
  auPairs : any[] = [];

  constructor(private serv: API) {}

  ngOnInit(): void {
    this.getSignUpRequests();
  }

  getSignUpRequests() {
    this.serv.getApplicants().toPromise().then(res => {
      this.auPairs = res;
      console.log(this.auPairs);
    }).catch(err => {
      console.log(err);
    });
  }

  resolve(userId : string, choice : boolean) {
    this.serv.resolveApplication(userId,choice).toPromise().then(res => {
      window.location.reload();
      return choice;
    }).catch(err => {
      console.log(err);
    });
  }

}
