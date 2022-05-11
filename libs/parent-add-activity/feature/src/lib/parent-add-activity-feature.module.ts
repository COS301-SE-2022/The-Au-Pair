import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentAddActivityComponent } from './parent-add-activity.component';
import { ParentAddActivityRoutingModule } from './parent-add-activity-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, ParentAddActivityRoutingModule, IonicModule],
  declarations: [ParentAddActivityComponent],
})
export class ParentAddActivityFeatureModule {}
