import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFieldComponent } from './password-field.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  declarations: [PasswordFieldComponent],
  exports: [PasswordFieldComponent],
})
export class PasswordFieldModule {}
