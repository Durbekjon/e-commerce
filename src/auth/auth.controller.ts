import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types/tokens.type';
import { getCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { RtGuard } from '../common/guards/rt.guard';
import { getCurrentUser } from '../common/decorators/get-current-user-decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.login(dto);
  }
  @Public()
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }
  @Post('logout')
  async logout(@getCurrentUserId() sub: number) {
    return this.authService.logout(sub);
  }
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @getCurrentUserId() id: number,
    @getCurrentUser('refresh_token') refresh_token: string,
  ) {
    console.log(refresh_token);

    return this.authService.refresh(id, refresh_token);
  }
}
