import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSummaryParentViewComponent } from './job-summary-parent-view.component';

const routes: Routes = [
  {
    path: '',
    component: JobSummaryParentViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobSummaryParentViewRoutingModule {}
