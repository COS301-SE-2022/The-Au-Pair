import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ShellModule } from '@the-au-pair/shell/feature';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [IonicModule.forRoot(), ShellModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
