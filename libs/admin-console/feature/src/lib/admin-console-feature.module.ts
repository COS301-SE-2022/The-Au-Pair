import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminConsoleComponent } from './admin-console.component';
import { AdminConsoleRoutingModule } from './admin-console-routing.module';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';


@NgModule({
  imports: [CommonModule, AdminConsoleRoutingModule, NavbarModule, IonicModule],
  declarations: [AdminConsoleComponent],
  providers: [API]
})
export class AdminConsoleFeatureModule {}
