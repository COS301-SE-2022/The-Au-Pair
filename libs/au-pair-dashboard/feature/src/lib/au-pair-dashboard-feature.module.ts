import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuPairDashboardComponent } from './au-pair-dashboard.component';
import { AuPairDashboardRoutingModule } from './au-pair-dashboard-routing.module';

@NgModule({
  imports: [CommonModule, AuPairDashboardRoutingModule],
  declarations: [AuPairDashboardComponent],
})
export class AuPairDashboardFeatureModule {}
