import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAuPairProfileComponent } from './edit-au-pair-profile.component';

const routes: Routes = [
  {
    path: '',
    component: EditAuPairProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAuPairProfileRoutingModule {}
