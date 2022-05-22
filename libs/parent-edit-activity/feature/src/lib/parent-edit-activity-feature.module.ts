import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentEditActivityComponent } from './parent-edit-activity.component';
import { ParentEditActivityRoutingModule } from './parent-add-activity-routing.module';

@NgModule({
  imports: [CommonModule, ParentEditActivityRoutingModule],
  declarations: [ParentEditActivityComponent],
})
export class ParentEditActivityFeatureModule {}
