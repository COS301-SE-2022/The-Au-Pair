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
  public errState: boolean;
  
  showPassword = false;

  constructor(public formBuilder: FormBuilder) {
    this.loginDetailsForm = formBuilder.group({
      email : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required])],
      pass : ['', Validators.compose([Validators.maxLength(20), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), Validators.required])],
    });

    this.submitAttempt = false;
    this.errState = false;
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  
  loginUser() {
    this.submitAttempt = true;

    if(this.loginDetailsForm.controls['email'].valid && this.loginDetailsForm.controls['pass'].valid) {
      this.errState = false;
      console.log(this.loginDetailsForm.value);
    }
    else {
      this.errState = true;
    }
  }
}
