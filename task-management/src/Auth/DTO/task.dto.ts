import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class taskDto{
  @ApiProperty({example : "Sample task one"})
  @IsString()
  @IsNotEmpty()
  title : string

  @ApiProperty({example : "Description about sample task"})
  @IsString()
  description :string
}