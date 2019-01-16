import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layout/full/full.component';
import { AuthGuard } from './guard/auth.guard';
import { BlankComponent } from './layout/blank/blank.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

const routes: Routes = [
  // After login routes
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '', redirectTo: localStorage.getItem('userData') ? 'dashboard' : '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './component/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        loadChildren: './component/user/user.module#UserModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'level',
        loadChildren: './component/level/level.module#LevelModule',
        canActivate: [AuthGuard]
      }
    ],
    canActivate: [AuthGuard]
  },
  // Auth routes
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule',
      }
    ]
  },
  // For all other routes
  {
    path: '**',
    redirectTo: '',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
