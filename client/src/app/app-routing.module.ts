/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-18 18:52:39                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-18 20:39:27                               *
 * @FilePath              : feely/client/src/app/app-routing.module.ts        *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsNotConnectedGuard } from './guards/is-not-connected.guard';

import { AdminView } from './views/admin/admin.view';
import { HomeView } from './views/home/home.view';
import { LoginView } from './views/login/login.view';

const routes: Routes = [
  { path: "", component: HomeView },
  { path: "admin", component: LoginView },
  { path: "dashboard", component: AdminView, canActivate: [IsNotConnectedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
