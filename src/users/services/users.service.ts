import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({where: {username}});
  }

  async createOne(body: Partial<User>): Promise<User> {
    const userEntity = await this.userRepository.create(body);
    return await this.userRepository.save(userEntity);
  }
}
