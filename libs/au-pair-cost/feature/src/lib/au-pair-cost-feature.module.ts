import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuPairCostComponent } from './au-pair-cost.component';
import { AuPairCostRoutingModule } from './au-pair-cost-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { ExtraCostsModalComponent } from './extra-costs-modal/extra-costs-modal.component';

@NgModule({
  imports: [CommonModule ,AuPairCostRoutingModule, IonicModule, NavbarModule],
  declarations: [AuPairCostComponent, ExtraCostsModalComponent],
  providers: [API],
  entryComponents: [ ExtraCostsModalComponent ]
})
export class AuPairCostFeatureModule {}
