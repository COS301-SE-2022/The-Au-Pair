import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminConsoleComponent } from './admin-console.component';
import { AdminConsoleRoutingModule } from './admin-console-routing.module';
import { AdminNavbarModule } from '@the-au-pair/shared/components/admin-navbar';

@NgModule({
  imports: [CommonModule, AdminConsoleRoutingModule, AdminNavbarModule],
  declarations: [AdminConsoleComponent],
})
export class AdminConsoleFeatureModule {}
