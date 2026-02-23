import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './User/user.module';
import { authModule } from './Auth/auth.module';

@Module({
  imports: [userModule,authModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
