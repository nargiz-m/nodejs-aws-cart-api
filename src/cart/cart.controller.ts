import { Controller, Get, Delete, Put, Body, Req, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { BasicAuthGuard } from '../auth';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from './services/cart.service';
import { Order } from '../order';
import { DataSource } from 'typeorm';
import { Cart } from './models/cart.entity';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private dataSource: DataSource,
    private cartService: CartService
  ) { }

  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const cart = await this.cartService.findOrCreateByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    }
  }

  @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) { // TODO: validate body payload...
    await this.cartService.updateByUserId(getUserIdFromRequest(req), body)

    return {
      statusCode: HttpStatus.OK,
      message: 'Cart is updated'
    }
  }

  @UseGuards(BasicAuthGuard)
  @Delete()
  clearUserCart(@Req() req: AppRequest) {
    this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    }
  }

  @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode

      return {
        statusCode,
        message: 'Cart is empty',
      }
    }

    if(!body.delivery || !body.payment) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode

      return {
        statusCode,
        message: 'Please add delivery and payment info',
      }
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderEntity: Partial<Order> = {
        cart_id: cart.id,
        user_id: cart.user_id,
        payment: body.payment,
        delivery: body.delivery,
        status: "new",
        total: cart.items.reduce((acc, val) => acc + val.count, 0)
      }
      const createdOrder = await queryRunner.manager.create(Order, orderEntity);
      await queryRunner.manager.save(createdOrder)
      const order = await queryRunner.manager.update(Cart, {id: cart.id}, {status: 'ORDERED'});
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: { createdOrder }
      }
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Order creation failed'
      }
    }
  }
}
