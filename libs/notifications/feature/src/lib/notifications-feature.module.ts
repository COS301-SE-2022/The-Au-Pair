import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';
import { ParentNotificationsComponent } from './parent-notifications.component';
import { ParentNotificationsRoutingModule } from './parent-notifications-routing.module';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { IonicModule } from '@ionic/angular';

export const parentNotificationsFeatureRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    ParentNotificationsRoutingModule,
    NavbarModule,
    IonicModule,
  ],
  declarations: [ParentNotificationsComponent],
})
export class NotificationsFeatureModule {}
