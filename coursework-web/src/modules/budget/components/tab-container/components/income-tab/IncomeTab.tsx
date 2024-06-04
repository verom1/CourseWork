import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { IncomeFormFields } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { incomeValidation } from "./validation";
import dayjs from "dayjs";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import IncomeApi from "@/lib/api/income/IncomeApi";
import { useTabContainerContext } from "../TabContainerContext";
import { useQuery } from "@tanstack/react-query";
import { IncomeCategory } from "@/types/income";

const IncomeTab = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<IncomeFormFields>({
    resolver: zodResolver(incomeValidation),
    defaultValues: {
      category: IncomeCategory.WITHOUT_CATEGORY,
      amount: 0,
      date: dayjs(),
    },
  });

  const { refetch } = useQuery({ queryKey: ["budget"] });
  const { refetch: refetchBudgetHistory } = useQuery({
    queryKey: ["budgetHistory"],
  });
  const { refetchIncome } = useTabContainerContext();

  const onSubmit = handleSubmit(async (data) => {
    try {
      clearErrors("root");
      await IncomeApi.createIncome({
        category: IncomeCategory[data.category as keyof typeof IncomeCategory],
        amount: data.amount,
        date: data.date.toISOString(),
      });
      refetchIncome();
      refetch();
      refetchBudgetHistory();
    } catch (error) {
      setError("root", { message: getErrorMessage(error) });
    }
  });

  return (
    <Box mt={2}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        noValidate
        onSubmit={onSubmit}
      >
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Income"
              variant="outlined"
              type="number"
              fullWidth
              placeholder="Enter your income"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select {...field} variant="outlined">
                {Object.values(IncomeCategory).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => <DesktopDatePicker format={'DD/MM/YYYY'} {...field} />}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
      <Typography variant="body2" color="error">
        {errors.amount?.message}
      </Typography>
    </Box>
  );
};

export default IncomeTab;
