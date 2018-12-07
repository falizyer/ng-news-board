import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardApiService } from './dashboard-api.service';

const routes: Routes = [
  { path: 'dashboard/:index', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [DashboardApiService]
})
export class DashboardRoutingModule {
}
