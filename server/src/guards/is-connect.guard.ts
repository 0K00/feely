/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-11-18 18:25:56                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-18 18:26:34                              *
 * @FilePath              : feely/server/src/guards/is-connect.guard.ts      *
 * @CopyRight             : MerBleueAviation                                 *
 ****************************************************************************/

/* Imports */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class IsConnectedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    try {
      if (process.env.DISABLE_GUARDS) return true; // Ignore guard

      const token = context.switchToHttp().getRequest().headers["x-token"];
      jwt.verify(token, process.env.SALT);
      return true;
    } catch (err) {
      return false;
    }
  }
}