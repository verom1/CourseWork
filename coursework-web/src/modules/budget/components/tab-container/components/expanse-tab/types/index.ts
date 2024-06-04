import { z } from "zod";
import { expanseValidation } from "../validation";

export type ExpanseFormFields = z.infer<typeof expanseValidation>;
