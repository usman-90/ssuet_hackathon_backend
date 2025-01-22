// @ts-nocheck
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string

  @IsNotEmpty()
  @IsString()
  last_name: string

  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string
}
