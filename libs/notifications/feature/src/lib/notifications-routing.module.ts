import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentNotificationsComponent } from './notifications.component';

const routes: Routes = [
  {
    path: '',
    component: ParentNotificationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentNotificationsRoutingModule {}
