-- CreateEnum
CREATE TYPE "IncomeCategory" AS ENUM ('SALARY', 'DIVIDENDS', 'INTEREST', 'RENTAL', 'BUSINESS', 'WITHOUT_CATEGORY', 'OTHER');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('FOOD', 'TRANSPORTATION', 'UTILITIES', 'INSURANCE', 'HEALTHCARE', 'SAVINGS', 'PERSONAL', 'WITHOUT_CATEGORY', 'OTHER');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "category" "ExpenseCategory" NOT NULL DEFAULT 'WITHOUT_CATEGORY';

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "category" "IncomeCategory" NOT NULL DEFAULT 'WITHOUT_CATEGORY';
