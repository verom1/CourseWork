import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BudgetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BudgetUncheckedCreateInput) {
    return this.prisma.budget.create({
      data,
    });
  }

  async find(data: Prisma.BudgetWhereInput) {
    return this.prisma.budget.findFirst({
      where: data,
    });
  }

  async findAll(data: Prisma.BudgetWhereInput) {
    return this.prisma.budget.findMany({
      where: data,
      include: {
        Expense: true,
        Income: true,
      },
    });
  }

  async update(id: string, data: Prisma.BudgetUncheckedUpdateInput) {
    return this.prisma.budget.update({
      where: { id },
      data,
    });
  }
}
