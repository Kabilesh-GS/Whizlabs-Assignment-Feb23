import { Injectable } from "@nestjs/common";
import { authRepo } from "./auth.repository";
import { loginDto } from "./DTO/login.dto";
import { taskDto } from "./DTO/task.dto";

@Injectable()
export class authService{
  constructor(private authR : authRepo){}

  async loginUser(login : loginDto){
    return await this.authR.loginUser(login);
  }

  async addTask(task : taskDto, userID : number){
    return await this.authR.addtask(task,userID);
  }

  async viewTask(userID : number){
    return await this.authR.viewTask(userID);
  }
}