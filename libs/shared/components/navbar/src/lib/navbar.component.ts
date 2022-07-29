import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Reset } from '../../../../../shared/ngxs/actions';

@Component({
  selector: 'the-au-pair-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit
{
  type = -1;
  isHome = this.router.url != "/parent-dashboard";

  constructor(private router : Router,private store: Store){}

  ngOnInit() 
  {
    this.type = this.store.snapshot().user.type;
  }

  dash()
  {
    if(this.type == 0)
    {
      this.router.navigate(['/admin-console']);
    }
    else if(this.type == 1)
    {
      this.router.navigate(['/parent-dashboard']);
    }
    else if(this.type == 2)
    {
      this.router.navigate(['/au-pair-dashboard']);
    }
  }

  notifications(){
    this.router.navigate(['/notifications']);
  }

  profile()
  {
    if(this.type == 0)
    {
      // this.router.navigate(['/admin-profile']);
    }
    else if(this.type == 1)
    {
      this.router.navigate(['/parent-profile']);
    }
    else if(this.type == 2)
    {
      this.router.navigate(['/au-pair-profile']);
    }
  }

  back()
  {
    if(this.type == 0)
    {
      this.router.navigate(['/admin-console']);
    }
    else if(this.type == 1)
    {
      this.router.navigate(['/parent-dashboard']);
    }
    else if(this.type == 2)
    {
      this.router.navigate(['/au-pair-dashboard']);
    }
  }

  logout()
  {
    this.store.dispatch(new Reset());
    this.router.navigate(['/login-page']);
  }

  reports() 
  {
    if(this.type == 0)
    {
      this.router.navigate(['/admin-reports']);
    }
  }
}
