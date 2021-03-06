import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentProfileComponent } from './parent-profile.component';
import { ParentProfileRoutingModule } from './parent-profile-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [CommonModule, ParentProfileRoutingModule, IonicModule, NavbarModule],
  declarations: [ParentProfileComponent],
  providers:[API]
})
export class ParentProfileFeatureModule {}
