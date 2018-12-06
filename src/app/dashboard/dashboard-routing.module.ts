import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardApiService } from './dashboard-api.service';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    resolve: {
      sources: DashboardApiService
    },
    children: [
      { path: '', redirectTo: 'page/1', pathMatch: 'full' },
      { path: 'page/:index', component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DashboardApiService]
})
export class DashboardRoutingModule {
}
