import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuPairScheduleComponent } from './au-pair-schedule.component';
import { AuPairScheduleRoutingModule } from './au-pair-schedule-routing.module';

@NgModule({
  imports: [CommonModule,AuPairScheduleRoutingModule],
  declarations: [AuPairScheduleComponent],
})
export class AuPairScheduleModule {}
