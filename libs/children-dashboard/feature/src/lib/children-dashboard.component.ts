import { Component, OnInit } from '@angular/core';
import { Child } from '../../../../shared/interfaces/interfaces';
import { API } from '../../../../shared/api/api.service';
import { Router } from '@angular/router';

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

  constructor(private serv: API, public router: Router) {}

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

  navigateEdit(child : Child)
  { 
    //Route to the edit-activity page and parse the ActivityID of the selected Activity 
    this.router.navigate(['/edit-child'],{
      state: {child: child}
    });
  }
}
