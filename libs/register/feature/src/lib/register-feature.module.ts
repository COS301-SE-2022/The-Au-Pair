import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterComponentRoutingModule } from './register-routing.module';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RegisterComponentRoutingModule],
  declarations: [RegisterComponent],
  providers:[API]
})
export class RegisterFeatureModule {}
