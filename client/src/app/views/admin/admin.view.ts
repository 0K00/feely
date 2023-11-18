/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-18 22:35:46                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-18 22:51:27                               *
 * @FilePath              : feely/client/src/app/views/admin/admin.view.ts    *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'view-admin',
  templateUrl: './admin.view.html',
  styleUrl: './admin.view.scss'
})
export class AdminView implements OnInit {

  constructor(
    private adminS: AdminService
  ) {}

  public users: any[] = [];

  public ngOnInit(): void {
    let headers = new Headers();
    console.log(this.adminS.getUser());

    headers.append("X-Token", this.adminS.getUser()!.token);

    let requestOptions = {
      method: 'GET',
      headers: headers,
    };

    fetch("http://localhost:3000/api/users", requestOptions)
      .then(response => response.json())
      .then(result => this.users = result)
      .catch(error => console.log('error', error));
  }
}
