import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuPairScheduleComponent } from "./au-pair-schedule.component";

const routes: Routes = [
  {
    path: '',
    component: AuPairScheduleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuPairScheduleRoutingModule {}
