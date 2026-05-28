import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserDocument } from '@app/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDocument => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: UserDocument }>();
    return request.user;
  },
);
