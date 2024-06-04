import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { BudgetRepository } from './repositories/budget.repository';
import { IncomeRepository } from './repositories/income.repository';
import { ExpanseRepository } from './repositories/expense.repository';

@Module({
  providers: [
    PrismaService,
    UserRepository,
    BudgetRepository,
    IncomeRepository,
    ExpanseRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    BudgetRepository,
    IncomeRepository,
    ExpanseRepository,
  ],
})
export class PrismaModule {}
