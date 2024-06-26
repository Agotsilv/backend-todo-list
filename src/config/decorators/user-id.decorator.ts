import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { authorizationToLoginPayload } from 'src/utils/base64-conveter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;
  const LoginPayload = authorizationToLoginPayload(authorization);
  return LoginPayload?.id;
});
