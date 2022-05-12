import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  providers: [Router]
})
export class NavbarModule {}
