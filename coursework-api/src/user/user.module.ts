import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserMapper } from './user.mapper';

@Module({
  providers: [UserService, UserMapper],
  controllers: [UserController],
  imports: [PrismaModule],
})
export class UserModule {}
