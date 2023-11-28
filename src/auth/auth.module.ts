import { PrismaService } from '../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AtStratergy } from './strategies/at.strategy';
import { AuthController } from './auth.controller';
import { RtStrategy } from './strategies/rt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStratergy, RtStrategy, PrismaService, JwtService],
  imports: [JwtModule.register({})],
})
export class AuthModule {}
