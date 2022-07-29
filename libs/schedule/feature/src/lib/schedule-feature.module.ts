import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ScheduleRoutingModule, IonicModule, NavbarModule, FormsModule],
  declarations: [ScheduleComponent],
  providers: [API]
})
export class ScheduleFeatureModule {}
