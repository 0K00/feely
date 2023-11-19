/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-11-18 18:37:25                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-19 09:45:41                              *
 * @FilePath              : feely/server/src/services/db.service.ts          *
 * @CopyRight             : MerBleueAviation                                 *
 ****************************************************************************/

import { Injectable } from '@nestjs/common';
import { sha256 } from 'js-sha256';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DatabaseService {
  constructor(private readonly prismaService: PrismaService) {}

  async initializeData(): Promise<void> {
    let isExist = await this.prismaService.admin.findUnique({where: {name: process.env.NAME}});
    if(!isExist) {
      await this.prismaService.admin.create({ data: {
          name: process.env.NAME,
          password: sha256(process.env.PW)
      } });
    }
  }

  async initializeDataVote(): Promise<void> {
    let isExist = await this.prismaService.getApp.findUnique({where: {id: 1}});
    if(!isExist) {
      await this.prismaService.getApp.create({ data: {
          yes: 0,
          no: 0
      } });
    }
  }
}