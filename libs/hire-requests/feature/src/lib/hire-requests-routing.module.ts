import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HireRequestsComponent } from "./hire-requests.component";

const routes: Routes = [
  {
    path: '',
    component: HireRequestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HireRequestsRoutingModule {}
