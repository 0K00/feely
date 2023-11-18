/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-18 19:01:37                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-18 19:01:37                               *
 * @FilePath              : feely/client/src/app/views/views.module.ts        *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeView } from './home/home.view';
import { AdminView } from './admin/admin.view';
import { LoginView } from './login/login.view';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeView,
    AdminView,
    LoginView
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HomeView,
    AdminView,
    LoginView
  ]
})
export class ViewsModule { }
