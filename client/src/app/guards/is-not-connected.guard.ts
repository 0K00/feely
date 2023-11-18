/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-11-18 18:57:01                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-18 22:43:52                              *
 * @FilePath              : feely/client/src/app/guards/is-not-connected.guard.ts*
 * @CopyRight             : MerBleueAviation                                 *
 ****************************************************************************/

/* Imports */
import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";

/* Services */
import { AdminService } from "../services/admin.service";
/***/

@Injectable({
  providedIn: "root"
})
export class IsNotConnectedGuard {
  constructor(private router: Router,
              private adminS: AdminService) {
  }
  canActivate(): boolean | UrlTree {
    if (!this.adminS.getUser()) this.router.navigateByUrl("/");
    return true;
  }
}
