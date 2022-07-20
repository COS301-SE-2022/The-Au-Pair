import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { ExploreRoutingModule } from './explore-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { ExpandModalComponent } from './expand-modal/expand-modal.component';

@NgModule({
  imports: [CommonModule, ExploreRoutingModule, IonicModule, NavbarModule],
  declarations: [ExploreComponent, ExpandModalComponent],
  providers: [API],
  entryComponents: [ExpandModalComponent],
})
export class ExploreFeatureModule {}
