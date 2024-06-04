import { ExpanseCategory } from "@/types/expanse";
import { IncomeCategory } from "@/types/income";

export interface BudgetHistory {
  id: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  category: ExpanseCategory | IncomeCategory;
}
