import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'the-au-pair-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  public loginDetailsForm: FormGroup;
  public submitAttempt: boolean;
  public errState: boolean;
  
  showPassword = false;

  constructor(public formBuilder: FormBuilder, public toastCtrl: ToastController, private serv: API) {
    this.loginDetailsForm = formBuilder.group({
      email : ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      pass : ['', Validators.compose([Validators.maxLength(20), Validators.required])],
    });

    this.submitAttempt = false;
    this.errState = false;
  }

  ngOnInit(): void {
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  } 

  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  
  async loginUser() 
  {
    this.submitAttempt = true;

    let dom = document.getElementById("emailError");
    if(!this.loginDetailsForm.controls['email'].valid)
    {
      this.errState = true
      if(dom != null)
      {
        dom.innerHTML = "Invalid email";
        dom.style.display = "block";
      }
    }
    else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }

    dom = document.getElementById("pswError");
    if(!this.loginDetailsForm.controls['pass'].valid)
    {
      this.errState = true
      if(dom != null)
      {
        dom.innerHTML = "Password empty";
        dom.style.display = "block";
      }
    }
    else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }

    if(!this.errState)
    {
      var id = "";
      var type = 0
      await this.serv.login(this.loginDetailsForm.value.email,this.loginDetailsForm.value.pass)
      .toPromise()
      .then(
        res => {
          id = res.id;
          type = res.type;
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      )
    }
  }

  async openToast(message: string)
  {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }
}
