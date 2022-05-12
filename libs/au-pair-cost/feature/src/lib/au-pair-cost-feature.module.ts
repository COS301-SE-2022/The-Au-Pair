import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuPairCostComponent } from './au-pair-cost.component';
import { AuPairCostRoutingModule } from './au-pair-cost-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [CommonModule ,AuPairCostRoutingModule, IonicModule,NavbarModule],
  declarations: [AuPairCostComponent],
  providers: [API]
})
export class AuPairCostFeatureModule {}
