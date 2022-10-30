import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (_data, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();

    return req.user.sub;
  },
);
