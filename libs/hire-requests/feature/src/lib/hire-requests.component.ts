import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { auPair, Child, Parent, User } from '../../../../shared/interfaces/interfaces';
@Component({
  selector: 'the-au-pair-hire-requests',
  templateUrl: './hire-requests.component.html',
  styleUrls: ['./hire-requests.component.scss'],
})
export class HireRequestsComponent implements OnInit {
  constructor(private serv: API){}

  ngOnInit(): void
  {
    
  }
}
