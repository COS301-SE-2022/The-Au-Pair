import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentDashboardComponent } from './parent-dashboard';
import { ParentDashboardRoutingModule } from './parent-dashboard-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [CommonModule, ParentDashboardRoutingModule, IonicModule, NavbarModule],
  declarations: [ParentDashboardComponent],
  providers:[API]
})
export class ParentDashboardFeatureModule {}
