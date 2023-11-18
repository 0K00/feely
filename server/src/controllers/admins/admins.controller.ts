/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-11-18 18:20:44                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-18 22:44:49                              *
 * @FilePath              : feely/server/src/controllers/admins/admins.controller.ts*
 * @CopyRight             : MerBleueAviation                                 *
 ****************************************************************************/

import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    HttpException,
    HttpStatus,
    Put,
    Delete
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma.service';

import * as jwt from "jsonwebtoken";
import { sha256 } from "js-sha256";


@Controller("api")
export class AdminsController {
  constructor(private prisma: PrismaService) {}

  @Post("login")
  async login(@Body() body): Promise<any> {
    try {
      
      const res = await this.prisma.admin.findUnique({where: {name: body.name}});
      
      if (!res) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);


      if (res.password !== sha256(body.password)) {
        throw new HttpException("Invalid Password", HttpStatus.BAD_REQUEST);
      }

      res["token"] = jwt.sign(res, process.env.SALT);

      return res;
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
}