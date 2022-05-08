import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, ScheduleRoutingModule, IonicModule],
  declarations: [ScheduleComponent]
})
export class ScheduleFeatureModule {}
