import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';

@Injectable()
export class UsersService {
  private saltRounds: number;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ConfigService<AppConfig>,
  ) {
    this.saltRounds = this.configService.get('salt_rounds');
  }

  async create(createUserDto: CreateUserDto) {
    const userAlreadyExistWithUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userAlreadyExistWithUsername) {
      throw new BadRequestException('Username already in use');
    }

    const hashedPass = await bcrypt.hash(createUserDto.password, this.saltRounds);
    return await this.userRepository.save({
      username: createUserDto.username.toLowerCase(),
      password: hashedPass,
    });
  }

  async findUserByUsernameWithPassword(username: string): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne();
  }
}
