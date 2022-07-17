import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'the-au-pair-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  public forgotPasswordDetailsForm: FormGroup;
  public submitAttempt: boolean;
  
  parentChosen = true;

  constructor(public formBuilder: FormBuilder) {
    this.forgotPasswordDetailsForm = formBuilder.group({
      email : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required])],
    });

    this.submitAttempt = false;
  }

  sendPasswordReset() {
    this.submitAttempt = true;

    return 0;
  }
}
