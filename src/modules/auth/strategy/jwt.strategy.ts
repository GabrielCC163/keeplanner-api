import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(@Request() req, payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
