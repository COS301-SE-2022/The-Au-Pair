import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';

@Component({
  selector: 'the-au-pair-au-pair-dashboard',
  templateUrl: './au-pair-dashboard.component.html',
  styleUrls: ['./au-pair-dashboard.component.scss'],
})
export class AuPairDashboardComponent implements OnInit {
  
  employer : any;
  employerName!: string;
  employerSurname! : string;
  employerId! : string;
  children: any[] = [];

  constructor(private serv: API) {}

  async ngOnInit(): Promise<void> {
    await this.getEmployer();
  }

  async getEmployer(){
    this.serv.getUser("4561237814867").subscribe(
      res=>{
          this.employer = res;
          this.employerName = this.employer.fname;
          this.employerSurname = this.employer.sname;
          this.employerId = this.employer.id;
          this.getChildren();
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  async getChildren(){
    this.serv.getChildren(this.employerId).subscribe(
      res=>{
        let i = 0;
        res.forEach((element: string) => {
          this.children[i++] = element;
          
        });
      },
      error =>{console.log("Error has occured with API: " + error);}
      
    )
  }
}
