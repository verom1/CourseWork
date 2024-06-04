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
import { ExpanseService } from './expanse.service';
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard';
import { ExpanseDTO } from './expanse.dto';

@Controller('expanse')
export class ExpanseController {
  constructor(private readonly expanseService: ExpanseService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getExpense(@Req() req) {
    return await this.expanseService.getExpense(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('summary')
  async getIncomeSummary(@Req() req) {
    return await this.expanseService.getExpanseSummary(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createIncome(@Req() req, @Body() body: ExpanseDTO) {
    return await this.expanseService.createExpanse(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateIncome(@Req() req, @Body() body: ExpanseDTO) {
    return await this.expanseService.updateExpanse(
      req.user.id,
      req.params.id,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteIncome(@Req() req) {
    return await this.expanseService.deleteExpanse(req.params.id);
  }
}
