import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';
import { ParentNotificationsComponent } from './notifications.component';
import { ParentNotificationsRoutingModule } from './notifications-routing.module';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';

export const parentNotificationsFeatureRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    ParentNotificationsRoutingModule,
    NavbarModule,
    IonicModule,
  ],
  declarations: [ParentNotificationsComponent],
  providers: [API],
})
export class NotificationsFeatureModule {}
