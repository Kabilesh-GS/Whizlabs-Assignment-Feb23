import { Injectable, OnModuleInit} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config'

@Injectable()
export class prismaService extends PrismaClient implements OnModuleInit{
  constructor() {
    var connectionString = process.env.DATABASE_URL;
    console.log('PrismaService connectionString:', connectionString);
    const adapter = new PrismaPg({ connectionString });
    super({ adapter } as any);
  }

  async onModuleInit() {
    await this.$connect();
  }
}