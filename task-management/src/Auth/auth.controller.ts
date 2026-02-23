import { Controller,Post,Body } from "@nestjs/common";
import { authService } from "./auth.service";
import { loginDto } from "./DTO/login.dto";

@Controller()

export class authController{
  constructor(private authSer : authService){}

  @Post('login')
  async loginUser(@Body() login : loginDto){
    return await this.authSer.loginUser(login);
  }
}