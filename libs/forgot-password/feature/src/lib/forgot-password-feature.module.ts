import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordComponentRoutingModule } from './forgot-password-routing.module';
import { IonicModule } from '@ionic/angular';
import { InputFieldModule } from '@the-au-pair/shared/components/input-field';
import { API } from '../../../../shared/api/api.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ForgotPasswordComponentRoutingModule, InputFieldModule],
  declarations: [ForgotPasswordComponent],
  providers:[API]
})
export class ForgotPasswordFeatureModule {}
