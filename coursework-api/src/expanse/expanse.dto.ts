import { ExpenseCategory } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ExpanseDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsNotEmpty()
  @IsEnum([
    'FOOD',
    'TRANSPORTATION',
    'UTILITIES',
    'INSURANCE',
    'HEALTHCARE',
    'SAVINGS',
    'PERSONAL',
    'WITHOUT_CATEGORY',
    'OTHER',
  ])
  category: ExpenseCategory;
}
