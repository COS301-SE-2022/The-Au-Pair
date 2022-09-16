import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HireRequestsComponent } from './hire-requests.component';
import { HireRequestsRoutingModule } from './hire-requests-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { FormsModule } from '@angular/forms';
import { JobSummaryModalComponent } from './job-summary-modal/job-summary-modal.component';

@NgModule({
  imports: [
    CommonModule,
    HireRequestsRoutingModule,
    IonicModule,
    NavbarModule,
    FormsModule,
  ],
  declarations: [HireRequestsComponent, JobSummaryModalComponent],
  providers: [API],
})
export class HireRequestsFeatureModule {}
