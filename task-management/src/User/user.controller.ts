import { Body, Controller, Post } from "@nestjs/common";
import { userService } from "./user.service";
import { userDto } from "./DTO/user.dto";

@Controller()

export class userController{
  constructor(private service : userService){}
  
  @Post('adduser')
  async addUser(@Body() user : userDto){
    return await this.service.addUser(user);
  }
}