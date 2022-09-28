import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetImgString } from '../../../../shared/ngxs/actions';
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

  hasImage = false;
  src = "";

  constructor(private api: API, private store : Store) {}

  ngOnInit() {
    this.userType = this.store.snapshot().user.type;
    this.userId = this.store.snapshot().user.id;
    this.setImage();

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

  async setImage(){
    await this.api.getFile(this.store.snapshot().user.id  +  ".png").toPromise().then(
      async res=>{
        if (res.size > 0){
          const dataType = res.type;
          const binaryData = [];
          binaryData.push(res);
          const href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          this.store.dispatch(new SetImgString(href));
          const dom = document.getElementsByClassName(this.userId);

          if(dom != null)
          {
            for(let i = 0; i < dom.length; i++)
            {
              dom[i].setAttribute("src", this.store.snapshot().user.imgString);
            }
          }

          this.hasImage = true;
        }
        else{
          const dom = document.getElementById("img1");
          if (dom != null) {
            dom.setAttribute("src","assets/images/placeholder-profile.jpg");
          }
          this.hasImage = true;
        }
      },
      error=>{
        return error;
      }
    );
  }
}
