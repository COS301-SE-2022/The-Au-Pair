import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddChildComponent } from './add-child.component';
import { AddChildRoutingModule } from './add-child-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [
    CommonModule,
    AddChildRoutingModule,
    IonicModule,
    FormsModule,
    NavbarModule
  ],
  declarations: [AddChildComponent],
  providers: [API]
})
export class AddChildFeatureModule {}
