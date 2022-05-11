import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule,IonicModule],
  declarations: [NavbarComponent],
})
export class NavbarModule {}
