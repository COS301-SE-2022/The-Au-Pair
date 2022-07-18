import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackAuPairComponent } from './track-au-pair.component';
import { TrackAuPairRoutingModule } from './track-au-pair-routing.module';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrackAuPairRoutingModule,
    NavbarModule,
    IonicModule,
  ],
  declarations: [TrackAuPairComponent],
  providers: [API]
})
export class TrackAuPairFeatureModule {}
