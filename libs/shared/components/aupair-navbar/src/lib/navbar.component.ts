import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'the-au-pair-aupair-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class AuPairNavbarComponent {
  isHome = this.router.url != "/parent-dashboard";

  constructor(private router : Router){}

  RedirectTo(route : string){
    this.router.navigate(['/' + route]);
  }

  back(){
    this.router.navigate(['/parent-dashboard']);
  }

  Repo(){
    window.location.href = "https://github.com/COS301-SE-2022/The-Au-Pair";
  }
}
