import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
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
  isHome = (this.router.url == "/parent-dashboard" || this.router.url == "/au-pair-dashboard");
  hasAuPair = false;
  kids = -1;
  loggedIn = false;

  constructor(private router : Router,private store: Store, private menController : MenuController, public toastCtrl: ToastController){}

  ngOnInit() 
  {
    this.type = this.store.snapshot().user.type;
    this.hasAuPair = this.store.snapshot().user.auPair != "";
    this.kids = this.store.snapshot().user.children.length;
    this.loggedIn = this.store.snapshot().user.loggedIn;
    if (this.router.url == "/landing-page"){
      this.loggedIn = false;
      this.store.dispatch(new Reset());
    }
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

  menuOpen()
  {
    this.menController.open('start')
  }

  menuClose()
  {
    this.menController.close('start');
  }

  logout()
  {
    this.store.dispatch(new Reset());
    this.router.navigate(['/login-page']);
  }

  login()
  {
    this.router.navigate(['/login-page']);
  }

  reports() 
  {
    if(this.type == 0)
    {
      this.router.navigate(['/admin-reports']);
    }
  }

  async openToast(message: string)
  {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }
}
