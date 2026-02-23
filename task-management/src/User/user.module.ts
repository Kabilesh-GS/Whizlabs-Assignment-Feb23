import { Module } from '@nestjs/common'
import { prismaService } from 'src/Prisma/prisma.service';
import { userService } from './user.service';
import { userRepo } from './user.repository';
import { userController } from './user.controller';

@Module({
  controllers : [userController],
  providers : [prismaService,userService,userRepo],
})
export class userModule{}
