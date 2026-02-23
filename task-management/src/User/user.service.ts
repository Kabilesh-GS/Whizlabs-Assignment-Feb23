import { Injectable } from "@nestjs/common";
import { userRepo } from "./user.repository";
import { userDto } from "./DTO/user.dto";

@Injectable()

export class userService{
  constructor(private userRepoIm : userRepo){}

  async addUser(user : userDto){
    return await this.userRepoIm.addUser(user);
  }
}