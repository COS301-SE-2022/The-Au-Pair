import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentViewActivityComponent } from './parent-view-activity.component';

const routes: Routes = [
  {
    path: '',
    component: ParentViewActivityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentViewActivityRoutingModule {}
