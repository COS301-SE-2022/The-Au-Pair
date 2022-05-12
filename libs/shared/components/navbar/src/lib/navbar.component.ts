import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'the-au-pair-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public router : Router){

  }

  isDesktop = true;

  RedirectTo(route : string){
    this.router.navigate(['/' + route]);
  }
}
