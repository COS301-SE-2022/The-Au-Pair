import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { ShellModule } from '@the-au-pair/shell/feature';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { API } from '../../../../libs/shared/api/api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { APP_BASE_HREF, CommonModule } from "@angular/common";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicModule.forRoot(), 
    ShellModule, 
    HttpClientModule, 
    NavbarModule,
    CommonModule
  ],
  bootstrap: [AppComponent],
  providers: [
    API,
    Geolocation,
    [{provide: APP_BASE_HREF, useValue: '/'}]
  ]
})
export class AppModule {}
