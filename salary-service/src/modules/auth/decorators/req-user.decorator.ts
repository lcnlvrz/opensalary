import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class UserPayloadDto {
  userId: number;
  email: string;
}

export const ReqUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserPayloadDto => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserPayloadDto = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  },
);
