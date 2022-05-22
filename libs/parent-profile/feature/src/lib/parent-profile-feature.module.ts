import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentProfileComponent } from './parent-profile.component';
import { ParentProfileRoutingModule } from './parent-profile-routing.module';

@NgModule({
  imports: [CommonModule, ParentProfileRoutingModule],
  declarations: [ParentProfileComponent],
})
export class ParentProfileFeatureModule {}
