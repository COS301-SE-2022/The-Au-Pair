import { Component, OnInit } from '@angular/core';
import { API } from "../../../../shared/api/api.service";
import { Store } from "@ngxs/store";
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'the-au-pair-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.scss'],
})
export class AdminConsoleComponent implements OnInit{
  auPairs : any[] = [];
  idNum : any;
  
  constructor(private serv: API, public store:Store) {
    this.idNum = this.store.snapshot().user.id;
    console.log(this.store.snapshot().user.id);
  }

  async ngOnInit(): Promise<void> {
    this.getSignUpRequests();    
  }

  getSignUpRequests() {
    this.serv.getApplicants().toPromise().then(res => {
      this.auPairs = res;
      console.log(this.store.snapshot());
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
