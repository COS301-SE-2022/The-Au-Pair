import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReportsComponent } from './admin-reports.component';
import { AdminReportsRoutingModule } from './admin-reports-routing.module';
import { AdminNavbarModule } from '@the-au-pair/shared/components/admin-navbar';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [CommonModule, AdminReportsRoutingModule, AdminNavbarModule, IonicModule],
  declarations: [AdminReportsComponent],
  providers: [API]
})
export class AdminReportsFeatureModule {}
