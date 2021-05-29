import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/modules/user/user.entity';

export const ReqUser = createParamDecorator(
  (_, executionContext: ExecutionContext): UserEntity => {
    const http = executionContext.switchToHttp();
    const request = http.getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  },
);
