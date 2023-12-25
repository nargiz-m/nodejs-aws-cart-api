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

  async updateByUserId(userId: string, items: CartItem[]) {
    const cart = await this.findOrCreateByUserId(userId);
    await items.forEach(async (item) => {
      const currentItem = cart.items.find((cartItem) => cartItem.product_id === item.product_id)
      if(currentItem) {
        await this.cartItemRepository.update({cart_id: cart.id, product_id: item.product_id}, { count: item.count + currentItem.count});
      } else {
        item.cart_id = cart.id
        const itemEntity = await this.cartItemRepository.create(item);
        await this.cartItemRepository.insert(itemEntity);
      }
    })
  }

  async removeByUserId(userId) {
    const cart = await this.findByUserId(userId)
    this.cartItemRepository.delete({cart_id: cart.id})
    this.cartRepository.delete({id: cart.id})
  }
}
