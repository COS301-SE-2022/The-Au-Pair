import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuPairProfileComponent } from './au-pair-profile.component';
import { AuPairProfileRoutingModule } from './au-pair-profile-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [CommonModule, AuPairProfileRoutingModule, IonicModule, NavbarModule],
  declarations: [AuPairProfileComponent],
  providers:[API]
})
export class AuPairProfileFeatureModule {}
