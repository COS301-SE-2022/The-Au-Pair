import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditChildComponent } from './edit-child.component';

const routes: Routes = [
  {
    path: '',
    component: EditChildComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditChildRoutingModule {}
