import { Controller,Post,Body, Req,UseGuards, Get, Param, Delete } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { authService } from "./auth.service";
import { loginDto } from "./DTO/login.dto";
import { Role } from "./role.decorator";
import { RolesGuard } from "./role.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { taskDto } from "./DTO/task.dto";
import { Request } from "express";
import { prismaService } from "src/Prisma/prisma.service";

export interface GetUserId extends Request {
  user: {
    id: number;
    email: string;
  };
}

@Controller()
export class authController{
  constructor(private authSer : authService, private prisma : prismaService){}

  @Post('login')
  async loginUser(@Body() login : loginDto){
    return await this.authSer.loginUser(login);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('user')
  @Post('addTask')
  async addTask(@Body() task : taskDto, @Req() req : GetUserId){
    const userID = req.user['id'];
    return await this.authSer.addTask(task, userID);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('admin')
  @Get('getTasks')
  async getTask(){
    return await this.prisma.task.findMany({
      include : {
        user : true
      }
    });
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('user')
  @Get('getUserTasks')
  async viewTask(@Req() req : GetUserId){
    const userID = req.user['id']
    return await this.authSer.viewTask(userID); 
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('admin')
  @Delete('deleteTask/:id')
  async deleteTask(@Param("id") taskID : number){
    console.log(taskID);
    return await this.authSer.deleteTask(Number(taskID)); 
  }
}