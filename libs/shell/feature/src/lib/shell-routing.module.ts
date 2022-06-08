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
    redirectTo: 'parent-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'au-pair-cost',
    loadChildren: () =>
      import('@the-au-pair/au-pair-cost/feature').then((m) => m.AuPairCostFeatureModule),
  },
  {  
    path: 'parent-dashboard',
    loadChildren: () =>
      import('@the-au-pair/parent-dashboard/feature').then((m) => m.ParentDashboardFeatureModule),
  },
  {
      path: 'add-activity',
      loadChildren: () =>
      import('@the-au-pair/parent-add-activity/feature').then((m) => m.ParentAddActivityFeatureModule),
  },
  {
    path: 'parent-profile',
    loadChildren: () =>
    import('@the-au-pair/parent-profile/feature').then((m) => m.ParentProfileFeatureModule),
  },
  {
    path: 'edit-parent-profile',
    loadChildren: () =>
    import('@the-au-pair/edit-parent-profile/feature').then((m) => m.EditParentProfileFeatureModule),
  },
  {
    path: 'edit-activity',
    loadChildren: () =>
    import('@the-au-pair/parent-edit-activity/feature').then((m) => m.ParentEditActivityFeatureModule),
  },
  {
    path: 'children-dashboard',
    loadChildren: () =>
    import('@the-au-pair/children-dashboard/feature').then((m) => m.ChildrenDashboardFeatureModule),
  },
  {
    path: 'add-child',
    loadChildren: () =>
    import('@the-au-pair/add-child/feature').then((m) => m.AddChildFeatureModule),
  },
  {
    path: 'au-pair-schedule',
    loadChildren: () =>
    import('@the-au-pair/au-pair-schedule/feature').then((m) => m.AuPairScheduleModule),
  },
  {
    path: 'au-pair-dashboard',
    loadChildren: () =>
    import('@the-au-pair/au-pair-dashboard/feature').then((m) => m.AuPairDashboardFeatureModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
