import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuPairNavbarComponent } from './navbar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [AuPairNavbarComponent],
  exports: [AuPairNavbarComponent],
})
export class AuPairNavbarModule {}
