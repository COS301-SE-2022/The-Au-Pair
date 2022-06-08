import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service'

@Component({
  selector: 'the-au-pair-au-pair-dashboard',
  templateUrl: './au-pair-dashboard.component.html',
  styleUrls: ['./au-pair-dashboard.component.scss'],
  providers: [API]
})
export class AuPairDashboardComponent  {
  constructor(private api:API) { }

  buttonVisible = false;


  logSwitch() {
    this.buttonVisible = !this.buttonVisible;
  }
}
