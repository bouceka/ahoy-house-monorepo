import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));
  app.useGlobalPipes(new ValidationPipe());
  // app.use(bodyParser.json({ limit: '50mb' }));
  const port = process.env.PORT;
  await app.listen(port || 3000);
}
bootstrap();
