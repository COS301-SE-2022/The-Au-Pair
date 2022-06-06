import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentEditActivityComponent } from './parent-edit-activity.component';

const routes: Routes = [
  {
    path: '',
    component: ParentEditActivityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentEditActivityRoutingModule {}
