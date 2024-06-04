import { Controller, Get, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getBudget(@Req() req) {
    return await this.budgetService.getBudget(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getBudgetHistory(
    @Req() req,
    @Query('category') category,
    @Query('date') date,
  ) {
    return await this.budgetService.getBudgetHistory(
      req.user.userId,
      category,
      date,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reset')
  async resetBudget(@Req() req) {
    return await this.budgetService.resetBudget(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('set')
  async setBudget(@Req() req) {
    return await this.budgetService.setBudget(req.user.userId, req.body.amount);
  }
}
