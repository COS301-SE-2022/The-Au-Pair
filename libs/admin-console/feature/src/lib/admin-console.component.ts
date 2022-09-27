import { Component, OnInit } from '@angular/core';
import { API } from "../../../../shared/api/api.service";
import { Store } from "@ngxs/store";

@Component({
  selector: 'the-au-pair-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.scss'],
})
export class AdminConsoleComponent implements OnInit{
  auPairs : any [] = [];
  idNum = "";
  
  constructor(private serv: API, public store:Store) {
    this.idNum = this.store.snapshot().user.id;
  }

  async ngOnInit(): Promise<void> {
    this.getSignUpRequests();    
  }

  async getSignUpRequests() {
    await this.serv.getApplicants().toPromise().then(res => {
      this.auPairs = res;

      for(let i = 0; i < this.auPairs.length; i++) {
        this.serv.getAuPair(this.auPairs[i].id).toPromise().then(dat => {
          
          this.auPairs[i].bio = dat.bio;
          this.auPairs[i].experience = dat.experience;
          
        }).catch(err => {
          console.log(err);
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  async resolve(userId : string, choice : boolean) {
    await this.serv.resolveApplication(userId,choice).toPromise().then(res => {
      console.log("The response is "+res);
      location.reload();
      return choice;
    }).catch(err => {
      console.log(err);
    });
  }
}
