import { Module } from "@nestjs/common";
import { prismaService } from "src/Prisma/prisma.service";
import { authService } from "./auth.service";
import { authRepo } from "./auth.repository";
import { authController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports : [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TOKEN,
    }),
  ],
  providers : [prismaService, authService,authRepo],
  controllers : [authController]
})

export class authModule{}