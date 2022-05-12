import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { IonicModule } from '@ionic/angular';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';

@NgModule({
  imports: [CommonModule, ScheduleRoutingModule, IonicModule,NavbarModule],
  declarations: [ScheduleComponent, ActivityCardComponent],
})
export class ScheduleFeatureModule {}
