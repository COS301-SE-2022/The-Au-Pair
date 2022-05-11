import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentDashboardComponent } from './parent-dashboard';
import { ParentDashboardRoutingModule } from './parent-dashboard-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, ParentDashboardRoutingModule, IonicModule],
  declarations: [ParentDashboardComponent]
})
export class ParentDashboardFeatureModule {}
