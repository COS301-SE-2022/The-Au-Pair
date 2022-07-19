import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditAuPairProfileComponent } from './edit-au-pair-profile.component';
import { EditAuPairProfileRoutingModule } from './edit-au-pair-profile-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, EditAuPairProfileRoutingModule, IonicModule, NavbarModule, FormsModule],
  declarations: [EditAuPairProfileComponent],
  providers:[API]
})
export class EditAuPairProfileFeatureModule {}
