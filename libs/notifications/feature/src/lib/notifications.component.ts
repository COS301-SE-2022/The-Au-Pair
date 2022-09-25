import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { API } from '../../../../shared/api/api.service';
import { Notification } from '../../../../shared/interfaces/interfaces';

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

    if(this.userType == 1)
    {
      this.api.getNotificationsByParentId(this.userId).toPromise().then(res => {
        this.notifications = res;
        //loop through all notifications and order by date
        this.notifications.sort((a, b) => {
          const first = new Date(b.date + 'T' + b.time+':00');
          const second = new Date(a.date + 'T' + a.time+':00');
          return  Number(first) - Number(second);
        });
      }, err => {
        console.log(err);
      });
    }

    if(this.userType == 2)
    {
      this.api.getNotificationsByAuPairId(this.userId).toPromise().then(res => {
        this.notifications = res;
        //loop through all notifications and order by date
        this.notifications.sort((a, b) => {
          const first = new Date(b.date + 'T' + b.time+':00');
          const second = new Date(a.date + 'T' + a.time+':00');
          return  Number(first) - Number(second);
        });
      }, err => {
        console.log(err);
      });
    }
  }
}
