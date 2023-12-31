import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItem, CartService, CartController } from './cart';
import 'dotenv/config';
import { Order, OrderService } from './order';
import { User, UsersService } from './users';
import { AuthService } from './auth';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { BasicStrategy, LocalStrategy } from './auth/strategies';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Cart, CartItem, Order, User],
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forFeature([Cart, CartItem, Order, User]),
  ],
  controllers: [CartController, AppController],
  providers: [CartService, OrderService, UsersService, AuthService, JwtService, BasicStrategy, LocalStrategy],
})
export class AppModule {}
