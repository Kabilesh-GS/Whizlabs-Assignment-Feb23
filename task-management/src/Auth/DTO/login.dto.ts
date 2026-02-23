import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class loginDto{
  @ApiProperty({example : "example@anymail.com"})
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email : string

  @ApiProperty({example : "Strong Password"})
  @IsString()
  @MinLength(7)
  @MaxLength(18)
  password : string
}