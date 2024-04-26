import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      if (
        !createUserDto.name ||
        !createUserDto.email ||
        !createUserDto.password
      ) {
        return 'Please fill all fields';
      }
      if (createUserDto.password.length < 6) {
        return 'Password must be at least 6 characters';
      }

      const user: User = new User();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      return this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  // async findprojects(id: number): Promise<any> {
  //   return await this.userRepository
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.project', 'projects')
  //     .where('user.id=:id', { id: id })
  //     .getMany();
  // }

  findOne(id: number) {
    return this.userRepository.findOne({
      select: ['email', 'password', 'name'],
      where: { id: id },
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      select: ['id', 'email', 'password', 'name'],
      where: { email: email },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
