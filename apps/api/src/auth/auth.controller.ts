import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './guards/Authenticated.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Session() session: Record<string, any>, @Res() res: Response) {
    console.log(session);

    return res
      .status(201)
      .json({ message: 'User logged in', user: session.passport.user });
  }

  @UseGuards(AuthenticatedGuard) @Get('status') getStatus(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(req.user);
    res.send(req.user);
  }

  @UseGuards(AuthenticatedGuard) @Get('profile') getProfile() {
    return 'profile';
  }
}
