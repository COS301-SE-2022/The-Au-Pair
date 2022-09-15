import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageComponentRoutingModule } from './landing-page-routing.module';

@NgModule({
  imports: [CommonModule, LandingPageComponentRoutingModule],
  declarations: [LandingPageComponent],
})
export class LandingPageFeatureModule {}
