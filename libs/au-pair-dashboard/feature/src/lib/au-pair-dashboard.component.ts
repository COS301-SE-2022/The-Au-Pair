import { Component, OnInit } from '@angular/core';
import { API } from 'libs/shared/api/api.service';

@Component({
  selector: 'the-au-pair-au-pair-dashboard',
  templateUrl: './au-pair-dashboard.component.html',
  styleUrls: ['./au-pair-dashboard.component.scss'],
})
export class AuPairDashboardComponent implements OnInit {
  
  employerName!: string;
  employerSurname! : string;
  employerId! : string;
  children: any[] = [];

  constructor(private serv: API) {}

  async ngOnInit(): Promise<void> {
    await this.getEmployer();
  }

  async getEmployer(){
    this.serv.getUserByUserId("4561237814867").subscribe(
      res=>{
          this.employerName = res.fname;
          this.employerSurname = res.sname;
          this.employerId = res.id;
          this.getChildren().then(()=>{
            this.populateChildren()
          });
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  populateChildren(){
    console.log("populate children");
  }

   async getChildren(){
    console.log(this.employerId);
    this.serv.getChildren(this.employerId).subscribe(
      res=>{
        let i = 0;
        res.forEach((element: string) => {
          this.children[i++] = element;
          
        });
        console.log(this.children);
      },
      error =>{console.log("Error has occured with API: " + error);}
      
    )
  }
}
