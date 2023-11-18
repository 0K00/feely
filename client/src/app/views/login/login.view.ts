/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-18 19:07:21                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-18 22:41:20                               *
 * @FilePath              : feely/client/src/app/views/login/login.view.ts    *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ILoggedUser, AdminService } from '../../services/admin.service';

@Component({
  selector: 'view-login',
  templateUrl: './login.view.html',
  styleUrl: './login.view.scss'
})
export class LoginView {

  constructor(
    private router: Router,
    private adminS: AdminService,) {}


  public name: string = "";
  public password: string = "";

  public connect(): void {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "name": this.name,
      "password": this.password
    });

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
    };

    fetch("http://localhost:3000/api/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.adminS.setUser(result as ILoggedUser);
        this.router.navigate(["/dashboard"]);
      })
      .catch(error => console.error('error', error));
      }
}
