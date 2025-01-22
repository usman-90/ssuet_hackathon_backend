import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  country: string

  @IsNotEmpty()
  @IsInt()
  @Min(3)
  @Max(150)
  age: number

  @IsNotEmpty()
  @IsString()
  password: string
}
