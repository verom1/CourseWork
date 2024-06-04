import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class IncomeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.IncomeUncheckedCreateInput) {
    return this.prisma.income.create({
      data,
    });
  }

  async findById(incomeId: string) {
    return this.prisma.income.findFirst({
      where: { id: incomeId },
    });
  }

  async findAllByBudgetId(budgetId: string, filters?: Prisma.IncomeWhereInput) {
    return this.prisma.income.findMany({
      where: { budgetId, ...filters },
    });
  }

  async update(id: string, data: Prisma.IncomeUncheckedUpdateInput) {
    return this.prisma.income.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.income.delete({
      where: { id },
    });
  }
}
