import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageComponentRoutingModule } from './landing-page-routing.module';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [CommonModule, LandingPageComponentRoutingModule, NavbarModule, IonicModule, SwiperModule],
  declarations: [LandingPageComponent],
})
export class LandingPageFeatureModule {}
