import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService],
  imports: [PrismaModule],
})
export class BudgetModule {}
