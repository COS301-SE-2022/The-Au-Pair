import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ShellModule } from '@the-au-pair/shell/feature';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [IonicModule.forRoot(), ShellModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
