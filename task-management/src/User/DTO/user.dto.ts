import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class userDto{
  @ApiProperty({example : 'Jon Doe'})
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name : string

  @ApiProperty({example : 'example@anymail.com'})
  @IsEmail()
  @IsNotEmpty()
  email : string

  @ApiProperty({example : 'StringPassword'})
  @IsString()
  @MinLength(7)
  @MaxLength(18)
  password : string
}