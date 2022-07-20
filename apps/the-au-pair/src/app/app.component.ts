import { Component } from '@angular/core';
import { NotificationsService } from "./notifications.service";

@Component({
  selector: 'the-au-pair-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private notificationsService : NotificationsService
  ) {
    
  }
}
