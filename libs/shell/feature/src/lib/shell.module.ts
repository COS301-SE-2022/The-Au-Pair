import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ShellRoutingModule } from './shell-routing.module';
import { IonicRouteStrategy } from '@ionic/angular';


@NgModule({
  imports: [BrowserModule, ShellRoutingModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}]
})
export class ShellModule {}
