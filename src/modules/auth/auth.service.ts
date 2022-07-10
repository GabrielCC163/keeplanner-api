import { UsersService } from '@modules/users/users.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@modules/users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async signIn(signIn: SignInDto): Promise<{ token: string }> {
    const INCORRECT_EMAIL_OR_PASSWORD = 'incorrect email or password';

    // This will be used for the initial login
    const userToAttempt = await this.usersService.findUserByEmailWithPassword(signIn.email.toLocaleLowerCase());

    if (!userToAttempt) throw new NotFoundException(INCORRECT_EMAIL_OR_PASSWORD);

    let isMatch = false;
    try {
      isMatch = await this.checkPassword(signIn.password, userToAttempt.password);
    } catch (error) {
      throw new UnauthorizedException(INCORRECT_EMAIL_OR_PASSWORD);
    }

    if (isMatch) {
      const result = this.createJwtPayload(userToAttempt);
      return result;
    } else {
      throw new UnauthorizedException(INCORRECT_EMAIL_OR_PASSWORD);
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
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
      token: jwt,
      data,
    };
  }
}
