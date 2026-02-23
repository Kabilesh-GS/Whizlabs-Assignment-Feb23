import { Injectable } from "@nestjs/common";
import { authRepo } from "./auth.repository";
import { loginDto } from "./DTO/login.dto";

@Injectable()
export class authService{
  constructor(private authR : authRepo){}

  async loginUser(login : loginDto){
    return await this.authR.loginUser(login);
  }
}