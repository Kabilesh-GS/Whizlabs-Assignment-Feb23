import { Injectable } from "@nestjs/common";
import { prismaService } from "src/Prisma/prisma.service";
import { userDto } from "./DTO/user.dto";

@Injectable()

export class userRepo{
  constructor(private prisma : prismaService){}

  async addUser(user : userDto){
    try{

      const userData = await this.prisma.user.create({
        data : {
          name: user.name,
          email : user.email,
          password : user.password,
          userRole : {
            create : {
              role : {
                connect : {
                  roles : "user"
                }
              }
            }
          }
        }
      })

      return {"message" : "user Created Successfully" , userData}
    }
    catch(err){
      return { err : err.meta.driverAdapterError.cause.originalMessage }
    }
  }
}