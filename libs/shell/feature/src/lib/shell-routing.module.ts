import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@the-au-pair/shared/services/auth';

const routes: Routes = [
  {
    path: 'schedule',
    loadChildren: () =>
      import('@the-au-pair/schedule/feature').then(
        (m) => m.ScheduleFeatureModule
      ),
    canLoad : [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full',
  },
  {
    path: 'au-pair-cost',
    loadChildren: () =>
      import('@the-au-pair/au-pair-cost/feature').then(
        (m) => m.AuPairCostFeatureModule
      ),
    canLoad : [AuthGuard]
  },
  {
    path: 'parent-dashboard',
    loadChildren: () =>
      import('@the-au-pair/parent-dashboard/feature').then(
        (m) => m.ParentDashboardFeatureModule
      ),
    canLoad : [AuthGuard]
  },
  {
    path: 'add-activity',
    loadChildren: () =>
      import('@the-au-pair/parent-add-activity/feature').then(
        (m) => m.ParentAddActivityFeatureModule
      ),
    canLoad : [AuthGuard]
  },
  {
    path: 'parent-profile',
    loadChildren: () =>
      import('@the-au-pair/parent-profile/feature').then(
        (m) => m.ParentProfileFeatureModule
      ),
    canLoad : [AuthGuard]
  },
  {
    path: 'edit-parent-profile',
    loadChildren: () =>
      import('@the-au-pair/edit-parent-profile/feature').then(
        (m) => m.EditParentProfileFeatureModule
      ),
    canLoad : [AuthGuard]
  },
  {
    path: 'edit-activity',
    loadChildren: () =>
      import('@the-au-pair/parent-edit-activity/feature').then(
        (m) => m.ParentEditActivityFeatureModule
      ),
    canLoad : [AuthGuard]
  },
  {
    path: 'view-activity',
    loadChildren: () =>
      import('@the-au-pair/parent-view-activity/feature').then(
        (m) => m.ParentViewActivityFeatureModule
      ),
    canLoad : [AuthGuard]
  },
  {
    path: 'children-dashboard',
    loadChildren: () =>
      import('@the-au-pair/children-dashboard/feature').then(
        (m) => m.ChildrenDashboardFeatureModule
      ),
    canLoad : [AuthGuard]
  },
  {
    path: 'add-child',
    loadChildren: () =>
      import('@the-au-pair/add-child/feature').then(
        (m) => m.AddChildFeatureModule
      ),
    canLoad : [AuthGuard]
  },
  {
    path: 'edit-child',
    loadChildren: () =>
      import('@the-au-pair/edit-child/feature').then(
        (m) => m.EditChildFeatureModule
      ),
    canLoad : [AuthGuard]
  },
  {
    path: 'au-pair-schedule',
    loadChildren: () =>
      import('@the-au-pair/au-pair-schedule/feature').then(
        (m) => m.AuPairScheduleModule
      ),
      canLoad : [AuthGuard]
  },
  {
    path: 'au-pair-dashboard',
    loadChildren: () =>
      import('@the-au-pair/au-pair-dashboard/feature').then(
        (m) => m.AuPairDashboardFeatureModule
      ),
      canLoad : [AuthGuard]
  },
  {
    path: 'au-pair-profile',
    loadChildren: () =>
      import('@the-au-pair/au-pair-profile/feature').then(
        (m) => m.AuPairProfileFeatureModule
      ),
      canLoad : [AuthGuard]
  },
  {
    path: 'edit-au-pair-profile',
    loadChildren: () =>
      import('@the-au-pair/edit-au-pair-profile/feature').then(
        (m) => m.EditAuPairProfileFeatureModule
      ),
      canLoad : [AuthGuard]
  },
  {
    path: 'track-au-pair',
    loadChildren: () =>
      import('@the-au-pair/track-au-pair/feature').then(
        (m) => m.TrackAuPairFeatureModule
      ),
      canLoad : [AuthGuard]
  },
  {
    path: 'login-page',
    loadChildren: () =>
      import('@the-au-pair/login/feature').then((m) => m.LoginFeatureModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('@the-au-pair/forgot-password/feature').then(
        (m) => m.ForgotPasswordFeatureModule
      ),
  },
  {
    path: 'register-page',
    loadChildren: () =>
      import('@the-au-pair/register/feature').then(
        (m) => m.RegisterFeatureModule
      ),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('@the-au-pair/notifications-feature').then(
        (m) => m.NotificationsFeatureModule
      ),
      canLoad : [AuthGuard]
  },
  {
    path: 'explore',
    loadChildren: () =>
      import('@the-au-pair/explore/feature').then(
        (m) => m.ExploreFeatureModule
      ),
      canLoad : [AuthGuard]
  },
  {
    path: 'admin-console',
    data: { animation: 'openClosePage' },
    loadChildren: () =>
      import('@the-au-pair/admin-console/feature').then(
        (m) => m.AdminConsoleFeatureModule
      ),
      canLoad : [AuthGuard]
  },
  {
    path: 'admin-reports',
    data: { animation: 'openClosePage' },
    loadChildren: () =>
    import('@the-au-pair/admin-reports/feature').then((m) => m.AdminReportsFeatureModule),
    canLoad : [AuthGuard]
  },
  {
    path: 'hire-requests',
    loadChildren: () =>
    import('@the-au-pair/hire-requests/feature').then((m) => m.HireRequestsFeatureModule),
    canLoad : [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login-page',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
