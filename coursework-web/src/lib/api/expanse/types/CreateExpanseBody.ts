import { ExpanseCategory } from "@/types/expanse";

export interface CreateExpanseBody {
  amount: number;
  date: string;
  category: ExpanseCategory;
}
