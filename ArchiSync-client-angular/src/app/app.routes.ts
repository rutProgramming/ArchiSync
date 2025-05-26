import { Routes } from '@angular/router';
import { AuthComponent } from './Components/auth/auth.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AnalyticsComponent } from './Components/analytics/analytics.component';
import { AuthGuard } from './guards/authGuard';
import { UsersComponent } from './Components/users/users.component';

export const routes: Routes = [

     { path: 'auth', component: AuthComponent },
   {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth' },
];
