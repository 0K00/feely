/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-18 18:20:44                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-18 18:20:44                               *
 * @FilePath              : feely/server/src/controllers/users/users.controller.ts*
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

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
  async getAll(): Promise<any> {
    try {
      return await this.prisma.user.findMany({});
    } catch (err) {
      throw err;
    }
  }

  @Get("users/:id")
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
}