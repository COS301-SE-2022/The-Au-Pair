import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { ShellModule } from '@the-au-pair/shell/feature';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { API } from '../../../../libs/shared/api/api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

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
  providers: [API, Geolocation]
})
export class AppModule {}
