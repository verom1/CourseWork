export interface Expanse {
  id: number;
  amount: number;
  date: string;
  category: ExpanseCategory;
}

export enum ExpanseCategory {
  FOOD = "FOOD",
  TRANSPORTATION = "TRANSPORTATION",
  UTILITIES = "UTILITIES",
  INSURANCE = "INSURANCE",
  HEALTHCARE = "HEALTHCARE",
  SAVINGS = "SAVINGS",
  PERSONAL = "PERSONAL",
  WITHOUT_CATEGORY = "WITHOUT_CATEGORY",
  OTHER = "OTHER",
}
