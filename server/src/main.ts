/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-18 22:17:56                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-19 09:37:06                               *
 * @FilePath              : feely/server/src/main.ts                          *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from 'fs';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('./secrets/private-key.pem'),
  //   cert: fs.readFileSync('./secrets/public-certificate.pem'),
  // };
  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
  });
  app.enableCors();
  await app.listen(Number(process.env.PORT));
}
bootstrap();
