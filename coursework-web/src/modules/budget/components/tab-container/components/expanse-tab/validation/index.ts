import { z } from "zod";

export const expanseValidation = z.object({
  amount: z
    .number({ required_error: "Specify amount" })
    .min(0.01, "Amount must be at least 0.01"),
  date: z.any(),
  category: z.enum([
    "FOOD",
    "TRANSPORTATION",
    "UTILITIES",
    "INSURANCE",
    "HEALTHCARE",
    "SAVINGS",
    "PERSONAL",
    "WITHOUT_CATEGORY",
    "OTHER",
  ]),
});
