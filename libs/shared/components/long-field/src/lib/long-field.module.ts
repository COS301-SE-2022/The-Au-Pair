import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LongFieldComponent } from './long-field.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  declarations: [LongFieldComponent],
  exports: [LongFieldComponent],
})
export class LongFieldModule {}
