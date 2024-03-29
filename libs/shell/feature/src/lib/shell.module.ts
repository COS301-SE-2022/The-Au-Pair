import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ShellRoutingModule } from './shell-routing.module';
import { IonicRouteStrategy } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';


@NgModule({
  imports: [BrowserModule, ShellRoutingModule,
    NgxsModule.forRoot([AppState]),
    NgxsStoragePluginModule.forRoot()
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  exports: [ShellRoutingModule]
})
export class ShellModule {}
