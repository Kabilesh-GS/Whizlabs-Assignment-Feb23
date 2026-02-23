import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class userDto{
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name : string

  @IsEmail()
  @IsNotEmpty()
  email : string

  @IsString()
  @MinLength(7)
  @MaxLength(18)
  password : string
}