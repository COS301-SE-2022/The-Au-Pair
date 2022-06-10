import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuPairDashboardComponent } from './au-pair-dashboard.component';
import { AuPairDashboardRoutingModule } from './au-pair-dashboard-routing.module';
import { IonicModule } from '@ionic/angular';
import { AuPairNavbarModule } from '@the-au-pair/shared/components/aupair-navbar';
import { API } from '../../../../../libs/shared/api/api.service';

@NgModule({
  imports: [CommonModule,AuPairDashboardRoutingModule,IonicModule,AuPairNavbarModule],
  providers: [API],
  declarations: [AuPairDashboardComponent],
})
export class AuPairDashboardFeatureModule {}
