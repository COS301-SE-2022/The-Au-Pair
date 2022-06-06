import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenDashboardComponent } from './children-dashboard.component';
import { ChildrenDashboardRoutingModule } from './children-dashboard-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';

@NgModule({
  imports: [
    CommonModule,
    ChildrenDashboardRoutingModule,
    IonicModule,
    NavbarModule
  ],
  declarations: [ChildrenDashboardComponent],
})
export class ChildrenDashboardFeatureModule {}
