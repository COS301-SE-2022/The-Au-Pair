import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenDashboardComponent } from './children-dashboard.component';
import { ChildrenDashboardRoutingModule } from './children-dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ChildrenDashboardRoutingModule
  ],
  declarations: [ChildrenDashboardComponent],
})
export class ChildrenDashboardFeatureModule {}
