import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
