import { Injectable } from '@nestjs/common';
import { Budget, ExpenseCategory, IncomeCategory } from '@prisma/client';
import { BudgetRepository } from 'src/prisma/repositories/budget.repository';
import { ExpanseRepository } from 'src/prisma/repositories/expense.repository';
import { IncomeRepository } from 'src/prisma/repositories/income.repository';

@Injectable()
export class BudgetService {
  constructor(
    private readonly budgetRepository: BudgetRepository,
    private readonly incomeRepository: IncomeRepository,
    private readonly expanseRepository: ExpanseRepository,
  ) {}

  async getBudget(userId: string): Promise<number> {
    const budget = await this.budgetRepository.find({ userId });
    return budget.amount;
  }

  async getBudgetHistory(
    userId: string,
    category: IncomeCategory | ExpenseCategory,
    date: string,
  ) {
    const budget = await this.budgetRepository.find({ userId });
    const incomes = await this.incomeRepository.findAllByBudgetId(budget.id, {
      category:
        category in IncomeCategory ? (category as IncomeCategory) : undefined,
      date: date && date !== '' ? { equals: new Date(date) } : undefined,
    });
    const expanses = await this.expanseRepository.findAllByBudgetId(budget.id, {
      category:
        category in ExpenseCategory ? (category as ExpenseCategory) : undefined,
      date: date && date !== '' ? { equals: new Date(date) } : undefined,
    });

    const incomesWithType = incomes.map((income) => {
      return { ...income, type: 'income' };
    });

    const expansesWithType = expanses.map((expanse) => {
      return { ...expanse, type: 'expanse' };
    });

    const history = [...incomesWithType, ...expansesWithType].sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });

    return history;
  }

  async resetBudget(userId: string): Promise<Budget> {
    const budget = await this.budgetRepository.find({ userId });
    return await this.budgetRepository.update(budget.id, { amount: 0 });
  }

  async setBudget(userId: string, amount: number): Promise<Budget> {
    const budget = await this.budgetRepository.find({ userId });

    return await this.budgetRepository.update(budget.id, { amount });
  }
}
