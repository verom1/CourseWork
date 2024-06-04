import { z } from "zod";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../validations";

export type LoginFormFields = z.infer<typeof loginValidationSchema>;
export type RegisterFormFields = z.infer<typeof registerValidationSchema>;
