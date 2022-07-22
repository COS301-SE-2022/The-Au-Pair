import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginComponentRoutingModule } from './login-routing.module';
import { InputFieldModule } from '@the-au-pair/shared/components/input-field';
import { PasswordFieldModule } from '@the-au-pair/shared/components/password-field';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InternalStateOperations } from '@ngxs/store/src/internal/state-operations';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, LoginComponentRoutingModule, InputFieldModule, PasswordFieldModule],
  declarations: [LoginComponent],
  providers:[API, InternalStateOperations]
})
export class LoginFeatureModule {}
