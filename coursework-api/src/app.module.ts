import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BudgetModule } from './budget/budget.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { IncomeModule } from './income/income.module';
import { ExpanseModule } from './expanse/expanse.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BudgetModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IncomeModule,
    ExpanseModule,
  ],
})
export class AppModule {}
