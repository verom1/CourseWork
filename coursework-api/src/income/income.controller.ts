import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard';
import { IncomeDTO } from './income.dto';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getIncome(@Req() req) {
    return await this.incomeService.getIncome(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('summary')
  async getIncomeSummary(@Req() req) {
    return await this.incomeService.getIncomeSummary(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createIncome(@Req() req, @Body() body: IncomeDTO) {
    return await this.incomeService.createIncome(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateIncome(@Req() req, @Body() body: IncomeDTO) {
    return await this.incomeService.updateIncome(
      req.user.userId,
      req.params.id,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteIncome(@Req() req) {
    return await this.incomeService.deleteIncome(req.params.id);
  }
}
