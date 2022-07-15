import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterComponentRoutingModule } from './register-routing.module';
import { InputFieldModule } from '@the-au-pair/shared/components/input-field';
import { PasswordFieldModule } from '@the-au-pair/shared/components/password-field';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, RegisterComponentRoutingModule, InputFieldModule, PasswordFieldModule],
  declarations: [RegisterComponent],
  providers:[API]
})
export class RegisterFeatureModule {}
