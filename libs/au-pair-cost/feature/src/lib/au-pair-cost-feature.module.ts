import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuPairCostComponent } from './au-pair-cost.component';
import { AuPairCostRoutingModule } from './au-pair-cost-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule ,AuPairCostRoutingModule, IonicModule],
  declarations: [AuPairCostComponent],
})
export class AuPairCostFeatureModule {}
