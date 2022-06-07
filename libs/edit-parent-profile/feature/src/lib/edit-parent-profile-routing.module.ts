import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditParentProfileComponent } from './edit-parent-profile.component';

const routes: Routes = [
  {
    path: '',
    component: EditParentProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditParentProfileRoutingModule {}
