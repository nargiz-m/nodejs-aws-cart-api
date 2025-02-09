import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
// import { Callback, Context, Handler } from 'aws-lambda';
// import serverlessExpress from '@vendia/serverless-express';

// let server: Handler
const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());
  await app.listen(port);
  // await app.init();
  
  // const expressApp = app.getHttpAdapter().getInstance();
  // return serverlessExpress({ app: expressApp });
}

bootstrap().then(() => {
  console.log('App is running on %s port', port);
});

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   server = server ?? (await bootstrap());
//   console.log('App is running')
//   return server(event, context, callback);
// };