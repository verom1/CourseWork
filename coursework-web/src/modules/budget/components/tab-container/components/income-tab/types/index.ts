import { z } from "zod";
import { incomeValidation } from "../validation";

export type IncomeFormFields = z.infer<typeof incomeValidation>;
