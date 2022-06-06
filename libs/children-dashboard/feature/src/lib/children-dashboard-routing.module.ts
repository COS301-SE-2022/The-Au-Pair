import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenDashboardComponent } from './children-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ChildrenDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildrenDashboardRoutingModule {}
