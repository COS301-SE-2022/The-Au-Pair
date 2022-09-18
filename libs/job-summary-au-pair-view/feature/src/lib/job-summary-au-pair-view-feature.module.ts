import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSummaryAuPairViewComponent } from './job-summary-au-pair-view.component';
import { JobSummaryAuPairViewRoutingModule } from './job-summary-au-pair-view-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [CommonModule, JobSummaryAuPairViewRoutingModule, IonicModule, NavbarModule],
  declarations: [JobSummaryAuPairViewComponent],
  providers:[API]
})
export class JobSummaryAuPairViewFeatureModule {}
