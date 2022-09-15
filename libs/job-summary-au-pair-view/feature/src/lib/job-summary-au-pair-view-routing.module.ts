import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSummaryAuPairViewComponent } from './job-summary-au-pair-view.component';

const routes: Routes = [
  {
    path: '',
    component: JobSummaryAuPairViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobSummaryAuPairViewRoutingModule {}
