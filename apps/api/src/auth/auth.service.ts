import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, passowrd: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === passowrd) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;

      return rest;
    }
    return null;
  }
}
