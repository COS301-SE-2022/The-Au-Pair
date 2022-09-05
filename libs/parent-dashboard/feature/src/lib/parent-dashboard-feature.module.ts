import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentDashboardComponent } from './parent-dashboard';
import { ParentDashboardRoutingModule } from './parent-dashboard-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { AuPairRatingModalComponent } from './au-pair-rating-modal/au-pair-rating-modal.component';
import { UserReportModalComponent } from './user-report-modal/user-report-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ParentDashboardRoutingModule,
    IonicModule,
    NavbarModule,
    FormsModule,
  ],
  declarations: [ParentDashboardComponent, AuPairRatingModalComponent, UserReportModalComponent],
  providers: [API],
  entryComponents: [AuPairRatingModalComponent],
})
export class ParentDashboardFeatureModule {}
