import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-11-18 18:56:01                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-18 18:56:41                              *
 * @FilePath              : feely/client/src/app/services/admin.service.ts   *
 * @CopyRight             : MerBleueAviation                                 *
 ****************************************************************************/

/* Interfaces */
export interface ILoggedUser {
  id: string,
  name: string,
  token: string,
}
/***/

@Injectable({
  providedIn: "root"
})
export class AdminService {
  private user: ILoggedUser | null = null;

  constructor(private router: Router) {
  }

  /**
  * Check if user is connected
  * @return - Boolean, true if user is connected
  */
  public isConnected(): boolean {
    return this.user && this.user.token ? true : false;
  }
  /***/

  /**
  * Get logged user
  * @return - Logged user
  */
  public getUser(): ILoggedUser | null {
    const session = sessionStorage.getItem("user");
    if (session) this.user = JSON.parse(session);

    const ret = this.isConnected() ? {...this.user as ILoggedUser} : null;
    return ret;
  }
  /***/

  /**
  * Set logged user
  * @param data - User's data
  */
  public setUser(data: ILoggedUser): void {
    this.user = data;
    sessionStorage.setItem("user", JSON.stringify(data));
  }
  /***/

  /**
  * Clear user
  */
  public clearUser(): void {
    this.user = null;
    sessionStorage.removeItem("user");
  }
  /***/

  /**
  * Logout
  */
  public logout(): void {
    this.clearUser();
    this.router.navigate(["/"]);
  }
  /***/
}
