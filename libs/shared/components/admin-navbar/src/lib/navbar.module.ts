import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from './navbar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [AdminNavbarComponent],
  exports: [AdminNavbarComponent],
})
export class AdminNavbarModule {}
