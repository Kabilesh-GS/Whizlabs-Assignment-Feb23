import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class loginDto{
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email : string

  @IsString()
  @MinLength(7)
  @MaxLength(18)
  password : string
}