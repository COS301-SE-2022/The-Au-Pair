import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentViewActivityComponent } from './parent-view-activity.component';
import { ParentViewActivityRoutingModule } from './parent-view-activity-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [CommonModule,
  ParentViewActivityRoutingModule,
  IonicModule,
  FormsModule,
  NavbarModule
  ],
  declarations: [ParentViewActivityComponent],
  providers: [API]
})
export class ParentViewActivityFeatureModule {}
