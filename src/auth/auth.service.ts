import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types/tokens.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  //   login
  async login(dto: LoginDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access denied: user not found');

    const passMatches = await bcrypt.compare(dto.password, user.password);
    if (!passMatches)
      throw new ForbiddenException("Access denied: password didn't match");

    const tokens = await this.getTokens(user.id, user.email);
    await this.RtToHash(user.id, tokens.refresh_token);

    return tokens;
  }
  //   register
  async register(dto: AuthDto) {
    const password = await this.dataHasher(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password,
      },
    });
    const Tokens = await this.getTokens(newUser.id, newUser.email);
    await this.RtToHash(newUser.id, Tokens.refresh_token);

    return Tokens;
  }
  //   logout
  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        token: {
          not: null,
        },
      },
      data: {
        token: null,
      },
    });
  }
  // refresh token
  async refresh(sub: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: sub,
      },
    });
    if (!user) throw new ForbiddenException('access denied: user not found');
    const rtMatches = await bcrypt.compare(rt, user.token);
    if (!rtMatches)
      throw new ForbiddenException("access denied: refresh token didn't match");
    const Tokens = await this.getTokens(user.id, user.email);
    await this.RtToHash(user.id, Tokens.refresh_token);
    return Tokens;
  }
  //   get access token and refresh token
  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 30,
          secret: 'at-secret',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 60 * 24,
          secret: 'rt-secret',
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  // data to hashed data
  async dataHasher(data: string) {
    return bcrypt.hash(data, 10);
  }
  // refresh token to hash and upload db
  async RtToHash(userId: number, rt: string) {
    const hashedToken = await this.dataHasher(rt);
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        token: hashedToken,
      },
    });
  }
}
