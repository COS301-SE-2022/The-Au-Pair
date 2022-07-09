import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginComponentRoutingModule } from './login-routing.module';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../shared/api/api.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LoginComponentRoutingModule],
  declarations: [LoginComponent],
  providers:[API]
})
export class LoginPageModule {}