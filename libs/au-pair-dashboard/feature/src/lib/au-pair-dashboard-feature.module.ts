import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuPairDashboardComponent } from './au-pair-dashboard.component';
import { AuPairDashboardRoutingModule } from './au-pair-dashboard-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../../libs/shared/api/api.service';
import { UserReportModalComponent } from './user-report-modal/user-report-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuPairDashboardRoutingModule,
    IonicModule,
    NavbarModule,
    FormsModule,
  ],
  providers: [API],
  declarations: [AuPairDashboardComponent, UserReportModalComponent],
  entryComponents: [UserReportModalComponent],
})
export class AuPairDashboardFeatureModule {}
