import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { API } from '../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { SetFcmToken, SetId , SetType, SetName, Reset, SetLoggedIn, SetEmail } from '../../../../shared/ngxs/actions';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'the-au-pair-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  public loginDetailsForm: FormGroup;
  public submitAttempt: boolean;
  public errState: boolean;
  public errStatement: string;
  public loggingIn: boolean;
  public formValid = false;
  
  fcmToken = '';

  constructor(public formBuilder: FormBuilder, public toastCtrl: ToastController, private serv: API, private store: Store, public httpClient: HttpClient, public router: Router,public loadingController: LoadingController) {
    this.loginDetailsForm = formBuilder.group({
      email : ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      pass : ['', Validators.compose([Validators.maxLength(20), Validators.required])],
    });

    this.loginDetailsForm.valueChanges.subscribe(() => {
      this.formValid = this.loginDetailsForm.valid;
    });

    this.submitAttempt = false;
    this.errState = false;
    this.errStatement = "";
    this.loggingIn = false;
  }

  ngOnInit(): void {
    this.store.dispatch(new Reset());
    if (Capacitor.getPlatform() !== 'web') {
      this.startPush();
    }
  } 

  startPush() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      this.fcmToken = token.value;
    });

    PushNotifications.addListener('registrationError', (error: JSON) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }
  
  async loginUser() 
  {
    this.submitAttempt = true;

    if(!this.loginDetailsForm.controls['email'].valid || !this.loginDetailsForm.controls['pass'].valid)
    {
      this.errStatement = "Fields cannot be empty";
      this.errState = true;
    }
    else {
      this.loggingIn = true;
      let id = "";
      let name = "";
      let type = 0;
      let banned = "";
      await this.serv.login((this.loginDetailsForm.value.email).toLowerCase(),this.loginDetailsForm.value.pass)
      .toPromise()
      .then(
        res => {
          id = res.id;
          name = res.fname;
          type = res.type;
          banned = res.banned;
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      );

      if(banned != ""){
        this.openToast("Your account has been banned")
      }
      else if(id == "")
      {
        this.errStatement = "Incorrect email or password";
        this.errState = true;
      }
      else if(id == "pending")
      (
        this.openToast("Your account is pending approval")
      )
      else
      {
        //this.presentLoadingWithOptions();
        this.errState = false;
        this.store.dispatch(new SetId(id));
        this.store.dispatch(new SetType(type));
        this.store.dispatch(new SetFcmToken(this.fcmToken));
        this.store.dispatch(new SetName(name));
        this.store.dispatch(new SetEmail(this.loginDetailsForm.value.email));

        //set loggedIn to true
        this.store.dispatch(new SetLoggedIn(true));

        if(type == 0)
        {
          this.router.navigate(['/admin-console']);
          this.loggingIn = false;
        }
        if(type == 1)
        {
          this.router.navigate(['/parent-dashboard']).then(() => {
            location.reload();
            this.loggingIn = false;
          });
        }
        else if(type == 2)
        {
          this.router.navigate(['/au-pair-dashboard']).then( () =>{
            location.reload();
            this.loggingIn = false;
          }
          );
        }

        this.serv.setFCMToken(id,this.fcmToken).toPromise().then(
          res => {
            console.log(res);
          },
          error => {
            console.log("Error has occured with API: " + error);
          }
        );
      }
      this.loggingIn = false;
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

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
      duration: 40000,
      translucent: true,
      cssClass: 'loader-bg'
    });
    return await loading.present();
  }
}
