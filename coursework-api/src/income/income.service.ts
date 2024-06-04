import { Injectable } from '@nestjs/common';
import { IncomeRepository } from 'src/prisma/repositories/income.repository';
import { IncomeDTO } from './income.dto';
import { BudgetRepository } from 'src/prisma/repositories/budget.repository';

@Injectable()
export class IncomeService {
  constructor(
    private readonly incomeRepository: IncomeRepository,
    private readonly budgetRepository: BudgetRepository,
  ) {}

  async getIncome(userId: string) {
    const { id: budgetId } = await this.budgetRepository.find({ userId });

    return await this.incomeRepository.findAllByBudgetId(budgetId);
  }

  async getIncomeSummary(userId: string) {
    const { id: budgetId } = await this.budgetRepository.find({ userId });

    const incomes = await this.incomeRepository.findAllByBudgetId(budgetId);

    return incomes.reduce((acc, income) => acc + income.amount, 0);
  }

  async createIncome(userId: string, data: IncomeDTO) {
    const { id: budgetId } = await this.budgetRepository.find({ userId });

    await this.budgetRepository.update(budgetId, {
      amount: {
        increment: data.amount,
      },
    });

    return await this.incomeRepository.create({
      ...data,
      date: new Date(data.date),
      budgetId,
    });
  }

  async updateIncome(userId: string, incomeId: string, data: IncomeDTO) {
    const { id: budgetId, amount: budgetAmount } =
      await this.budgetRepository.find({userId});
    const { amount } = await this.incomeRepository.findById(incomeId);

    await this.budgetRepository.update(budgetId, {
      amount: budgetAmount - amount + data.amount,
    });

    return await this.incomeRepository.update(incomeId, {
      ...data,
      date: new Date(data.date),
    });
  }

  async deleteIncome(incomeId: string) {
    const income = await this.incomeRepository.findById(incomeId);
    const { budgetId } = income;

    await this.budgetRepository.update(budgetId, {
      amount: {
        decrement: income.amount,
      },
    });

    return await this.incomeRepository.delete(incomeId);
  }
}
