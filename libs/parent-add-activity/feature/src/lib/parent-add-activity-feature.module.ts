import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentAddActivityComponent } from './parent-add-activity.component';
import { ParentAddActivityRoutingModule } from './parent-add-activity-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService, NavigationLineService, SelectionService, AnnotationsService, ZoomService } from '@syncfusion/ej2-angular-maps';


@NgModule({
  imports: [
    CommonModule, 
    ParentAddActivityRoutingModule, 
    IonicModule, 
    FormsModule,
    NavbarModule,
    MapsModule
  ],
  declarations: [ParentAddActivityComponent],
  providers:[API,LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService, NavigationLineService , SelectionService, AnnotationsService, ZoomService]
})
export class ParentAddActivityFeatureModule 
{
  constructor()
  {
    //Do something
  }
}
