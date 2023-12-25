import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartItem } from '../models/cart.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartRepository.findOne({where: {user_id: userId}, relations : ["items"]});
  }

  async createByUserId(userId: string) {
    const cart = this.cartRepository.create({
      user_id: userId, 
      items: [], 
      updated_at: Date.now().toLocaleString(),
      created_at: Date.now().toLocaleString(),
      status: "OPEN"
    });
    return this.cartRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<UpdateResult> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      ...rest,
      items: [ ...items ],
    }

    return this.cartRepository.update(id, updatedCart);
  }

  removeByUserId(userId): void {
    this.cartRepository.delete({user_id: userId})
  }
}
