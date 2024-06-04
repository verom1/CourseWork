import { Injectable } from '@nestjs/common';
import { ExpanseDTO } from './expanse.dto';
import { BudgetRepository } from 'src/prisma/repositories/budget.repository';
import { ExpanseRepository } from 'src/prisma/repositories/expense.repository';

@Injectable()
export class ExpanseService {
  constructor(
    private readonly expanseRepository: ExpanseRepository,
    private readonly budgetRepository: BudgetRepository,
  ) {}

  async getExpense(userId: string) {
    const { id: budgetId } = await this.budgetRepository.find({ userId });

    return await this.expanseRepository.findAllByBudgetId(budgetId);
  }

  async getExpanseSummary(userId: string) {
    const { id: budgetId } = await this.budgetRepository.find({ userId });

    const incomes = await this.expanseRepository.findAllByBudgetId(budgetId);

    return incomes.reduce((acc, income) => acc + income.amount, 0);
  }

  async createExpanse(userId: string, data: ExpanseDTO) {
    const { id: budgetId } = await this.budgetRepository.find({ userId });

    await this.budgetRepository.update(budgetId, {
      amount: {
        decrement: data.amount,
      },
    });

    return await this.expanseRepository.create({
      ...data,
      date: new Date(data.date),
      budgetId,
    });
  }

  async updateExpanse(userId: string, expanseId: string, data: ExpanseDTO) {
    const { id: budgetId, amount: budgetAmount } =
      await this.budgetRepository.find({userId});
    const { amount } = await this.expanseRepository.findById(expanseId);

    await this.budgetRepository.update(budgetId, {
      amount: budgetAmount + amount - data.amount,
    });

    return await this.expanseRepository.update(expanseId, {
      ...data,
      date: new Date(data.date),
    });
  }

  async deleteExpanse(expanseId: string) {
    const expanse = await this.expanseRepository.findById(expanseId);
    const { budgetId } = expanse;
    await this.budgetRepository.update(budgetId, {
      amount: {
        increment: expanse.amount,
      },
    });

    return await this.expanseRepository.delete(expanseId);
  }
}
