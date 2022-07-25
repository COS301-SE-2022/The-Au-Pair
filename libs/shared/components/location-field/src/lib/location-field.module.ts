import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationFieldComponent } from './location-field.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Maps } from '@syncfusion/ej2-angular-maps';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService, NavigationLineService, SelectionService, AnnotationsService, ZoomService } from '@syncfusion/ej2-angular-maps';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, MapsModule],
  declarations: [LocationFieldComponent],
  providers: [LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService, NavigationLineService , SelectionService, AnnotationsService, ZoomService],
  exports: [LocationFieldComponent],
})
export class LocationFieldModule {}
