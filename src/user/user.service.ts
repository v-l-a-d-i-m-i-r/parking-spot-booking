import { Injectable } from '@nestjs/common';

import { PrivateUserModel } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public findUserByToken(input: FindUserByTokenInput): Promise<PrivateUserModel | null> {
    return this.userRepository.findUserByToken(input);
  }
}

type FindUserByTokenInput = {
  token: string;
};
