import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'the-au-pair-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  
  public loginDetailsForm: FormGroup;
  public submitAttempt: boolean;
  
  showPassword = false;

  constructor(public formBuilder: FormBuilder) {
    this.loginDetailsForm = formBuilder.group({
      email: [''],
      // : [''],
      // age: ['']
    });

    this.submitAttempt = false;
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  
  loginUser() {
    console.log(this.loginDetailsForm.value);
    return 0;
  }
}
