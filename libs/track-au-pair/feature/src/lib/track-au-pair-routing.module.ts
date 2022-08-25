import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackAuPairComponent } from './track-au-pair.component';

const routes: Routes = [
  {
    path: '',
    component: TrackAuPairComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackAuPairRoutingModule {}
