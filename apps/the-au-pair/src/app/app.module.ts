import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { ShellModule } from '@the-au-pair/shell/feature';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicModule.forRoot(), 
    ShellModule, 
    HttpClientModule, 
    NavbarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
