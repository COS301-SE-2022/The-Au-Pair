import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { ActionPerformed, PushNotifications,PushNotificationSchema, Token } from '@capacitor/push-notifications';
 
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
 
  constructor(private router: Router) { }
 
  initPush() {
    console.log("Lekke bro");
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }
 
  private registerPush() {
    PushNotifications.addListener(
      'registration',
      (token: Token) => {
        console.log('My token: ' + JSON.stringify(token));
      }
    );
 
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });
 
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );
 
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          this.router.navigateByUrl(`/home/${data.detailsId}`);
        }
      }
    );
  }
}