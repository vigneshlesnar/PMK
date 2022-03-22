import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth/auth.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'users',
    pathMatch: 'full',
  },
  {
    path:'login',
    loadChildren : () => import('./login/login.module').then(m=>m.LoginModule),
  },
  {
    path:'users',
    loadChildren : () => import('./users-list/users-list.module').then(m=>m.UsersListModule),
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
