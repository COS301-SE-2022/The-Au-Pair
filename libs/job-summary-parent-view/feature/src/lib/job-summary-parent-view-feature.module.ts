import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSummaryParentViewComponent } from './job-summary-parent-view.component';
import { JobSummaryParentViewRoutingModule } from './job-summary-parent-view-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [CommonModule, JobSummaryParentViewRoutingModule, IonicModule, NavbarModule],
  declarations: [JobSummaryParentViewComponent],
  providers:[API]
})
export class JobSummaryParentViewFeatureModule {}
