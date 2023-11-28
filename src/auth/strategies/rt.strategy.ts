import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

type Payload = {
  sub: number;
  email: string;
};

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: 'rt-secret',

      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: Payload) {
    const refresh_token = req.get('Authorization').replace('Bearer', '').trim();
    return {
      ...payload,
      refresh_token,
    };
  }
}
