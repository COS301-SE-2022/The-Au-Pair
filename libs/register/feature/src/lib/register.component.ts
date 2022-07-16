import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'the-au-pair-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public parentRegisterDetailsForm: FormGroup;
  public submitAttempt: boolean;
  
  parentChosen = true;

  constructor(public formBuilder: FormBuilder) {
    this.parentRegisterDetailsForm = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ,\'-]+$'), Validators.required])],
      surname : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ,\'-]+$'), Validators.required])],
      email : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required])],
      phone : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^(\\+27|0)[6-8][0-9]{8}$'), Validators.required])],
      id : ['', Validators.compose([Validators.maxLength(13), Validators.pattern('(((\\d{2}((0[13578]|1[02])(0[1-9]|[12]\\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\\d|30)|02(0[1-9]|1\\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\\d{4})( |-)(\\d{3})|(\\d{7}))'), Validators.required])],
      medAid : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('\\d*'), Validators.required])],
      address : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z \\d]*'), Validators.required])],
      pass : ['', Validators.compose([Validators.maxLength(20), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), Validators.required])],
      confPass : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), Validators.required])],
    });

    this.submitAttempt = false;
  }

  registerUser() {
    this.submitAttempt = true;

    return 0;
  }
}
