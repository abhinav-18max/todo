import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register') // @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (await this.userService.findOneByEmail(createUserDto.email)) {
      return res.status(230).json({ message: 'Email already exists' });
    } else {
      await this.userService.create(createUserDto);
      return res.status(200).json({ message: 'User created' });
    }
  }

  @Get() findAll() {
    return this.userService.findAll();
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('email/:email') findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
