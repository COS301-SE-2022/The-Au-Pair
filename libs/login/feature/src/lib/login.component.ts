import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { API } from '../../../../shared/api/api.service';
import { Store } from '@ngxs/store';
import { SetFcmToken, SetId , SetType } from '../../../../shared/ngxs/actions';
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

  fcmToken = '';
  showPassword = false;

  constructor(public formBuilder: FormBuilder, public toastCtrl: ToastController, private serv: API, private store: Store, public httpClient: HttpClient, public router: Router) {
    this.loginDetailsForm = formBuilder.group({
      email : ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      pass : ['', Validators.compose([Validators.maxLength(20), Validators.required])],
    });

    this.submitAttempt = false;
    this.errState = false;
  }

  ngOnInit(): void {
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
      console.log(token.value);
      alert('Push registration success, token: ' + token.value);
      this.fcmToken = token.value;
    });

    PushNotifications.addListener('registrationError', (error: JSON) => {
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
    // const  requestHeaders = new HttpHeaders().set('Authorization', 'key=AAAAlhtqIdQ:APA91bFlcYmdaqt5D_jodyiVQG8B1mkca2xGh6XKeMuTGtxQ6XKhSY0rdLnc0WrXDsV99grFamp3k0EVHRUJmUG9ULcxf-VSITFgwwaeNvrUq48q0Hn1GLxmZ3GBAYdCBzPFIRdbMxi9');


    // const postData = {
    //   "to":"cpCzpEgxS-a499oPCvLMen:APA91bFT5p3bJFyl4wVQw4TBs5WShA0jPhZTZrRtzlYjpo5SwlilkhER0LPQjB_ySMYaxiREpuEVuqiUZsIoBg-__zveSXUgS_ouwWFal3GzfNcYg47MDnJSlGpaZBqHjRkvFbH0i1Gb",
    //   "notification":{
    //     "title":"Order #44",
    //     "body": "Hello bro"
    //   }
    // }
    // console.log(requestHeaders)
    // this.httpClient.post('https://fcm.googleapis.com/fcm/send',postData, {headers: requestHeaders})
    // .subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    // });


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
      let id = "";
      let type = 0
      await this.serv.login((this.loginDetailsForm.value.email).toLowerCase(),this.loginDetailsForm.value.pass)
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

      if(id == "")
      {
        this.openToast("Inccorect email or password");
      }
      else if(id == "pending")
      (
        this.openToast("Your account is pending approval")
      )
      else  
      {
        this.store.dispatch(new SetId(id));
        this.store.dispatch(new SetType(type));
        this.store.dispatch(new SetFcmToken(this.fcmToken));

        if(type == 0)
        {
          this.router.navigate(['/admin-console']);
        }
        if(type == 1)
        {
          this.router.navigate(['/parent-dashboard']);
        }
        else if(type == 2)
        {
          this.router.navigate(['/au-pair-dashboard']);
        }
      }
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
