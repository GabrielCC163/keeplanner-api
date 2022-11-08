import { UsersService } from '@modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@modules/users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async signIn(signIn: SignInDto): Promise<{ token: string }> {
    const INCORRECT_USERNAME_OR_PASSWORD = 'incorrect username or password';

    let userToAttempt = await this.usersService.findUserByUsernameWithPassword(signIn.username.toLocaleLowerCase());

    let isMatch = false;
    try {
      if (!userToAttempt) {
        userToAttempt = await this.usersService.create(signIn);
        isMatch = true;
      } else {
        isMatch = await this.checkPassword(signIn.password, userToAttempt.password);
      }
    } catch (error) {
      throw new UnauthorizedException(INCORRECT_USERNAME_OR_PASSWORD);
    }

    if (isMatch) {
      const result = this.createJwtPayload(userToAttempt);
      return result;
    } else {
      throw new UnauthorizedException(INCORRECT_USERNAME_OR_PASSWORD);
    }
  }

  private checkPassword(attempt: string, userPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(attempt, userPassword, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });
  }

  private createJwtPayload(user: UserEntity) {
    const data: JwtPayload = {
      sub: user.id,
      username: user.username,
    };

    const jwt = this.jwtService.sign(data);

    return {
      token: jwt,
      data,
    };
  }
}
