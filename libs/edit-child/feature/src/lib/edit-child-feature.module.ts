import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditChildComponent } from './edit-child.component';
import { EditChildRoutingModule } from './edit-child-routing.module';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [
    CommonModule,
    EditChildRoutingModule,
    IonicModule,
    FormsModule,
    NavbarModule
  ],
  declarations: [EditChildComponent],
  providers: [API]
})
export class EditChildFeatureModule {}
