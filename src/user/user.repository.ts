import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserMapper } from './user.mapper';
import { PrivateUserModel } from './user.model';

@Injectable()
export class UserRepository {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userMapper: UserMapper,
  ) {}

  public async findUserByToken(input: FindUserByTokenInput): Promise<PrivateUserModel | null> {
    const user = await this.userRepository.findOneBy(input);

    return this.userMapper.mapEntityToPrivateModelIfExists(user);
  }
}

type FindUserByTokenInput = {
  token: string;
};
