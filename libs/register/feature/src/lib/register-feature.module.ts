import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterComponentRoutingModule } from './register-routing.module';
import { InputFieldModule } from '@the-au-pair/shared/components/input-field';
import { PasswordFieldModule } from '@the-au-pair/shared/components/password-field';
import { LocationFieldModule } from '@the-au-pair/shared/components/location-field';
import { LongFieldModule } from '@the-au-pair/shared/components/long-field';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService, NavigationLineService, SelectionService, AnnotationsService, ZoomService } from '@syncfusion/ej2-angular-maps';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, RegisterComponentRoutingModule, InputFieldModule, PasswordFieldModule, LocationFieldModule, LongFieldModule, MapsModule],
  declarations: [RegisterComponent],
  providers:[API,LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService, NavigationLineService , SelectionService, AnnotationsService, ZoomService]
})
export class RegisterFeatureModule {}
