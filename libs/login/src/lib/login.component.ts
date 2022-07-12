import { Component } from '@angular/core';

@Component({
  selector: 'the-au-pair-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  showPassword = false;

  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  
  loginUser() {
    return 0;
  }

  forgotPassword() {
    return 0;
  }
}
