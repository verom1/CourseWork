import { z } from "zod";

export const incomeValidation = z.object({
  amount: z
    .number({ required_error: "Specify amount" })
    .min(0.01, "Amount must be at least 0.01"),
  date: z.any(),
  category: z.enum([
    "SALARY",
    "DIVIDENDS",
    "INTEREST",
    "RENTAL",
    "BUSINESS",
    "WITHOUT_CATEGORY",
    "OTHER",
  ]),
});
