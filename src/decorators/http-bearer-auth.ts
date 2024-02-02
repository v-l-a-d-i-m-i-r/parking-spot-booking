import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';

import { UserService } from '../user/user.service';
import { extractTokenFromHeader } from '../utils/extract-token-from-header';

@Injectable()
class HTTPBearerAuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findUserByToken({ token });
    if (!user) {
      throw new UnauthorizedException();
    }

    request['user'] = user;

    return true;
  }
}

export function HTTPBearerAuth(): MethodDecorator & ClassDecorator {
  return applyDecorators(UseGuards(HTTPBearerAuthGuard));
}
