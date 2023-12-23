import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());
  
  await app.init();
  return awsServerlessExpress({ app });;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  console.log('App is running')
  return server(event, context, callback);
};