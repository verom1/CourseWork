import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [IncomeService],
  controllers: [IncomeController],
  imports: [PrismaModule],
})
export class IncomeModule {}
