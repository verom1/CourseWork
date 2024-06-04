import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExpanseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ExpenseUncheckedCreateInput) {
    return this.prisma.expense.create({
      data,
    });
  }

  async findById(expenseId: string) {
    return this.prisma.expense.findFirst({
      where: { id: expenseId },
    });
  }

  async findAllByBudgetId(
    budgetId: string,
    filters?: Prisma.ExpenseWhereInput,
  ) {
    return this.prisma.expense.findMany({
      where: { budgetId, ...filters },
    });
  }

  async update(id: string, data: Prisma.ExpenseUncheckedUpdateInput) {
    return this.prisma.expense.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
