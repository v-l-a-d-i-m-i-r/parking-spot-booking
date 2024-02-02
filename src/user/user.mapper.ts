import { Injectable } from '@nestjs/common';

import { UserEntity } from './user.entity';
import { PrivateUserModel, UserModel } from './user.model';

@Injectable()
export class UserMapper {
  public mapEntityToModel(entity: UserEntity): UserModel {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      role: entity.role,
    };
  }

  public mapEntityToPrivateModelIfExists(entity: UserEntity | null): PrivateUserModel | null {
    if (!entity) {
      return null;
    }

    return {
      ...this.mapEntityToModel(entity),
      token: entity.token,
    };
  }
}
