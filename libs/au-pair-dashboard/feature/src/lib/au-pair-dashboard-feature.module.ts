import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../../../shared/components/navbar/src';
import { AuPairDashboardComponent } from './au-pair-dashboard.component';
import { AuPairDashboardRoutingModule } from './au-pair-dashboard-routing.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [CommonModule, NavbarModule, AuPairDashboardRoutingModule,IonicModule],
  declarations: [AuPairDashboardComponent],
})
export class AuPairDashboardFeatureModule {}
