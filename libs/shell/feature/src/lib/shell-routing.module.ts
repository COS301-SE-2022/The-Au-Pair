import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('@the-au-pair/home/feature').then((m) => m.HomePageModule),
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('@the-au-pair/schedule/feature').then((m) => m.ScheduleFeatureModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'au-pair-cost',
    loadChildren: () =>
      import('@the-au-pair/au-pair-cost/feature').then((m) => m.AuPairCostFeatureModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
