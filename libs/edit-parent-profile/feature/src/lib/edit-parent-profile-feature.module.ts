import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditParentProfileComponent } from './edit-parent-profile.component';
import { EditParentProfileRoutingModule } from './edit-parent-profile-routing.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, EditParentProfileRoutingModule, IonicModule, NavbarModule, FormsModule],
  declarations: [EditParentProfileComponent],
  providers:[API]
})
export class EditParentProfileFeatureModule {}
