import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HireRequestsComponent } from './hire-requests.component';
import { HireRequestsRoutingModule } from './hire-requests-routing.module';
import { IonicModule } from '@ionic/angular';
import { AuPairNavbarModule } from '@the-au-pair/shared/components/aupair-navbar';
import { API } from '../../../../shared/api/api.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, HireRequestsRoutingModule, IonicModule, AuPairNavbarModule, FormsModule,],
  declarations: [HireRequestsComponent],
  providers: [API],
})
export class HireRequestsFeatureModule {}
