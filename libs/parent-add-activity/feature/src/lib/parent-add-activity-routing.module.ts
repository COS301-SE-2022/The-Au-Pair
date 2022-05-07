import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentAddActivityComponent } from './parent-add-activity/parent-add-activity.component';

const routes: Routes = [
  {
    path: '',
    component: ParentAddActivityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentAddActivityRoutingModule {}
