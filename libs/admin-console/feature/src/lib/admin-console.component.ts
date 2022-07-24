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

  resolve(userId : string, choice : boolean) {
    this.serv.resolveApplication(userId,choice).toPromise().then(res => {
      window.location.reload();
      return choice;
    }).catch(err => {
      console.log(err);
    });
  }
}
