import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from '../../../../shared/api/api.service';
import { Activity } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-parent-view-activity',
  templateUrl: './parent-view-activity.component.html',
  styleUrls: ['./parent-view-activity.component.scss'],
})
export class ParentViewActivityComponent implements OnInit {
  constructor(private serv: API, private router: Router) {}

  ngOnInit(): void {
    console.log();
  }

  returnToSchedule()
  {
    this.router.navigate(['/schedule']).then(()=>{
      window.location.reload();
    });
  }
}
