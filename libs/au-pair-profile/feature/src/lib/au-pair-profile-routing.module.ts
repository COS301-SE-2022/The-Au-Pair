import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuPairProfileComponent } from './au-pair-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AuPairProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuPairProfileRoutingModule {}
