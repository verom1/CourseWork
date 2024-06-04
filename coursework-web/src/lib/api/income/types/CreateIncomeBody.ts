import { IncomeCategory } from "@/types/income";

export interface CreateIncomeBody {
  amount: number;
  date: string;
  category: IncomeCategory;
}
