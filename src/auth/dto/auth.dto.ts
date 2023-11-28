import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @ApiProperty({
    description: 'example name',
    example: 'John Doe',
  })
  name: string;
  @ApiProperty({
    description: 'example email',
    example: 'yourname@example.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'example password',
    example: 'J2.0s_Nv/3i7dB',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'example email',
    example: 'yourname@example.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'example password',
    example: 'J2.0s_Nv/3i7dB',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
