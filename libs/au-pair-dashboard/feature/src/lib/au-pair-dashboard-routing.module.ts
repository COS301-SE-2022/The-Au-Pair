import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuPairDashboardComponent } from './au-pair-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AuPairDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuPairDashboardRoutingModule {}
