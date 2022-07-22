import { Component, OnInit } from '@angular/core';
import { API } from "../../../../shared/api/api.service";

@Component({
  selector: 'the-au-pair-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.scss'],
})
export class AdminConsoleComponent implements OnInit{

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

  reject(userId : string) {
    this.serv.resolveApplication(userId,false).toPromise().then(res => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });
  }

  accept(userId : string) {
    this.serv.resolveApplication(userId,true).toPromise().then(res => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });
  }
}
