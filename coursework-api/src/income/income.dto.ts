import { IncomeCategory } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class IncomeDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsNotEmpty()
  @IsEnum([
    'SALARY',
    'DIVIDENDS',
    'INTEREST',
    'RENTAL',
    'BUSINESS',
    'WITHOUT_CATEGORY',
    'OTHER',
  ])
  category: IncomeCategory;
}
