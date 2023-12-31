import { Injectable } from '@nestjs/common';
import { Order } from '../models/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(data: Partial<Order>): Promise<InsertResult> {
    const orderEntity = await this.orderRepository.create(data);
    return await this.orderRepository.insert(orderEntity);
  }
}
