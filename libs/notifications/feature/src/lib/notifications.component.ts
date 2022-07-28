import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { API } from 'libs/shared/api/api.service';
import { Notification } from 'libs/shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class ParentNotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  userType = -1;
  userId = "";
  constructor(private api: API, private store : Store) {}

  ngOnInit() {
    this.userType = this.store.snapshot().user.type;
    this.userId = this.store.snapshot().user.id;
    console.log(this.userId);

    if(this.userType == 1)
    {
      this.api.getNotificationsByParentId(this.userId).toPromise().then(res => {
        this.notifications = res;
        console.log(this.notifications);
        const time = this.notifications[0].date + 'T' + this.notifications[0].time+':00';
        const date = new Date(time);
        console.log(date);
        console.log(time);
      }, err => {
        console.log(err);
      });
    }
  }
}
