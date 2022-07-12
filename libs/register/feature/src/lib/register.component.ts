import { Component } from '@angular/core';

@Component({
  selector: 'the-au-pair-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  showPassword = false;
  parentChosen = true;

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  registerUser() {
    return 0;
  }
}
