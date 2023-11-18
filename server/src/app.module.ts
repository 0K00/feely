/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-18 18:38:51                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-18 22:19:11                               *
 * @FilePath              : feely/server/src/app.module.ts                    *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsController } from './controllers/admins/admins.controller';
import { UsersController } from './controllers/users/users.controller';
import { PrismaService } from './prisma.service';
import { DatabaseService } from './services/db.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, AdminsController],
  providers: [DatabaseService, AppService, PrismaService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dbService: DatabaseService) {}

  async onModuleInit(): Promise<void> {
    await this.dbService.initializeData();
  }
}
