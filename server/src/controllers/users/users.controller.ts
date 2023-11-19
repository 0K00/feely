/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-18 18:20:44                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-19 03:04:46                               *
 * @FilePath              : feely/server/src/controllers/users/users.controller.ts*
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Put,
    HttpException,
    HttpStatus,
    UseGuards
  } from '@nestjs/common';
import { IsConnectedGuard } from 'src/guards/is-connect.guard';
  import { PrismaService } from 'src/prisma.service';


@Controller("api")
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Post("users")
  async new(@Body() body): Promise<any> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          gender: body.gender,
          age: body.age,
          score: body.score
        }
      });

      return newUser;
    } catch (err) {
      throw err;
    }
  }
  
  @Get("users")
  @UseGuards(IsConnectedGuard)
  async getAll(): Promise<any> {
    try {
      return await this.prisma.user.findMany({});
    } catch (err) {
      throw err;
    }
  }

  @Get("users/:id")
  @UseGuards(IsConnectedGuard)
  async getById(@Param("id") id: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {id: parseInt(id)}
      });

      if (user) return user;
      else throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    } catch (err) {
      throw err;
    }
  }

  @Put("app")
  async vote(@Body() body): Promise<any> {
    try {
      let nb = await this.prisma.getApp.findUnique({where: {id: 1}});
      let yes = nb.yes;
      let no = nb.no;
      if(body.vote) {
        yes += 1;
      } else {
        no += 1;
      }
      let vote = await this.prisma.getApp.update({
        where: {id: 1},
        data: {
          yes: yes,
          no: no
        }
      });

      return vote;
    } catch (err) {
      throw err;
    }
  }

  @Get("app/:id")
  @UseGuards(IsConnectedGuard)
  async getAppById(@Param("id") id: string): Promise<any> {
    try {
      const app = await this.prisma.getApp.findUnique({
        where: {id: parseInt(id)}
      });

      if (app) return app;
      else throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    } catch (err) {
      throw err;
    }
  }
}