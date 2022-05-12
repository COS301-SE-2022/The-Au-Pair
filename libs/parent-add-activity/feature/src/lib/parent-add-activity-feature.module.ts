import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentAddActivityComponent } from './parent-add-activity.component';
import { ParentAddActivityRoutingModule } from './parent-add-activity-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { API } from '../../../../shared/api/api.service';

@NgModule({
  imports: [
    CommonModule, 
    ParentAddActivityRoutingModule, 
    IonicModule, 
    FormsModule
  ],
  declarations: [ParentAddActivityComponent],
  providers:[API]
})
export class ParentAddActivityFeatureModule 
{
  constructor()
  {
    //Do something
  }
}
