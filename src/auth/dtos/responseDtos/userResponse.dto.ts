//@ts-nocheck
import { Exclude } from 'class-transformer'

export class UserResponseDto {
  id: number
  first_name: string
  last_name: string
  email: string
  created_at: Date
  token: string
  username: string

  @Exclude()
  password: string

  constructor(obj: UserResponseDto) {
    Object.assign(this, obj)
  }
}
