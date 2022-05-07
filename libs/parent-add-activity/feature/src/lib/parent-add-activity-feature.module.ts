import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentAddActivityComponent } from './parent-add-activity/parent-add-activity.component';
import { ParentAddActivityRoutingModule } from './parent-add-activity-routing.module';

@NgModule({
  imports: [CommonModule, ParentAddActivityRoutingModule],
  declarations: [ParentAddActivityComponent],
})
export class ParentAddActivityFeatureModule {}
