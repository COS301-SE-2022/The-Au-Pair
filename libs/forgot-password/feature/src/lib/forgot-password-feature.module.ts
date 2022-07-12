import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordComponentRoutingModule } from './forgot-password-routing.module';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ForgotPasswordComponentRoutingModule],
  declarations: [ForgotPasswordComponent],
  providers:[API]
})
export class ForgotPasswordFeatureModule {}
