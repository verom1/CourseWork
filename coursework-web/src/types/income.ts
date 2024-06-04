export interface Income {
  id: number;
  amount: number;
  date: string;
  category: IncomeCategory;
}

export enum IncomeCategory {
  SALARY = "SALARY",
  DIVIDENDS = "DIVIDENDS",
  INTEREST = "INTEREST",
  RENTAL = "RENTAL",
  BUSINESS = "BUSINESS",
  WITHOUT_CATEGORY = "WITHOUT_CATEGORY",
  OTHER = "OTHER",
}
