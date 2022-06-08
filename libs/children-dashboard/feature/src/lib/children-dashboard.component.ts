import { Component, OnInit } from '@angular/core';
import { Child } from '../../../../shared/interfaces/interfaces';
import { API } from '../../../../shared/api/api.service';

@Component({
  selector: 'the-au-pair-children-dashboard',
  templateUrl: './children-dashboard.component.html',
  styleUrls: ['./children-dashboard.component.scss'],
})
export class ChildrenDashboardComponent implements OnInit 
{
  //Parent and children information
  employerId = "4561237814867";
  children: Child[] = []

  constructor(private serv: API) {}

  ngOnInit(): void
  {
    this.getChildren();
  }

  async getChildren()
  {
    this.serv.getChildren(this.employerId).subscribe(
      res=>{
        let i = 0;
        res.forEach((element: Child) => 
        {
          this.children[i++] = element;
        });
      },
      error =>{console.log("Error has occured with API: " + error);}
    )
  }
}
