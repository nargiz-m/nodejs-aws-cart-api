import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItem } from './cart/models/cart.entity';
import { CartService } from './cart';
import { CartController } from './cart/cart.controller';
import 'dotenv/config';
import { Order, OrderService } from './order';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Cart, CartItem, Order],
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forFeature([Cart, CartItem, Order]),
  ],
  controllers: [CartController],
  providers: [CartService, OrderService],
})
export class AppModule {}
