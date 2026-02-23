import { BadRequestException, Injectable } from "@nestjs/common";
import { prismaService } from "src/Prisma/prisma.service";
import { loginDto } from "./DTO/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()

export class authRepo{
  constructor(private prisma : prismaService,private jwtService : JwtService){}

  async loginUser(login : loginDto){
    const user = await this.prisma.user.findUnique({
      where : {
        email : login.email
      },
      include : {
        userRole : {
          include : {
            role : true
          }
        }
      }
    })

    console.log(user);
    if(!user){
      throw new BadRequestException("No such User")
    }

    const role = user.userRole.map((u) => {
      return u.role.roles;
    })
    console.log(role);

    const payload = {
      sub : user.id,
      username : user.name,
      role : role
    }

    const accesstoken = await this.jwtService.signAsync(payload, {
      secret : process.env.JWT_TOKEN,
      expiresIn: '15m'
    });

    const refreshtoken = await this.jwtService.signAsync(payload, {
      secret : process.env.JWT_TOKEN,
      expiresIn: '7d'
    });

    await this.prisma.user.update({
      where : {
        id : user.id,
      },
      data : {
        refreshtoken : refreshtoken
      }
    })

    return {accesstoken, refreshtoken, name : user.name, email : user.email}
  }
}