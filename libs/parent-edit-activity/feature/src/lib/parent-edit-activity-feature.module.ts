import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentEditActivityComponent } from './parent-edit-activity.component';
import { ParentEditActivityRoutingModule } from './parent-add-activity-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [CommonModule,
     ParentEditActivityRoutingModule,
     IonicModule,
     FormsModule,
     NavbarModule
    ],
  declarations: [ParentEditActivityComponent],
  providers:[API]
})
export class ParentEditActivityFeatureModule {}
