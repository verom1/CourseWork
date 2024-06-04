import { Module } from '@nestjs/common';
import { ExpanseService } from './expanse.service';
import { ExpanseController } from './expanse.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ExpanseService],
  controllers: [ExpanseController],
  imports: [PrismaModule],
})
export class ExpanseModule {}
