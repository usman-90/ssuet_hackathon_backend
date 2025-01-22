// @ts-nocheck
import { PickType } from '@nestjs/swagger'
import { SignUpDto } from './signup.dto'

export class SignInDto extends PickType(SignUpDto, ['email', 'password'] as const) {}
