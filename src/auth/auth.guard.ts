import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class employeeGuards implements CanActivate {
  public credentials = { username: 'test', password: 'test' };

  canActivate(context: ExecutionContext): boolean {
    const { headers } = context.switchToHttp().getRequest();

    return (
      headers['username'] === this.credentials.username &&
      headers['password'] === this.credentials.password
    );
  }
}
