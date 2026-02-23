import { BadRequestException, Injectable } from "@nestjs/common";
import { prismaService } from "src/Prisma/prisma.service";
import { loginDto } from "./DTO/login.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { taskDto } from "./DTO/task.dto";

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
    if(!(await bcrypt.compareSync(login.password,user.password))){
      throw new BadRequestException("Wrong Password")
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

  async addtask(task : taskDto, userID : number){
    const tasksAddition = await this.prisma.task.create({
      data : {
        title : task.title,
        description : task.description,
        ownerID : userID
      }
    })

    return tasksAddition;
  }

  async viewTask(userID : number){
    const tasksAddition = await this.prisma.task.findMany({
      where : {
        user : {
          id : userID
        }
      }
    })

    return tasksAddition;
  }

  async deleteTask(taskID : number){
    const task = await this.prisma.task.findUnique({
      where : {
        id : taskID
      }
    })

    if(!task){
      throw new BadRequestException("Task not found");
    }

    await this.prisma.task.delete({
      where : {
        id : taskID
      }
    })

    const allTask = await this.prisma.task.findMany({});

    return { message : "Task deleted successfully", allTasks : allTask }
  }
}