import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuPairCostComponent } from './au-pair-cost.component';

const routes: Routes = [
  {
    path: '',
    component: AuPairCostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuPairCostRoutingModule {}
