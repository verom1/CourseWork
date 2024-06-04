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
import { ExpanseFormFields } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { expanseValidation } from "./validation";
import dayjs from "dayjs";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import ExpanseApi from "@/lib/api/expanse/ExpanseApi";
import { useTabContainerContext } from "../TabContainerContext";
import { useQuery } from "@tanstack/react-query";
import { ExpanseCategory } from "@/types/expanse";

const ExpanseTab = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<ExpanseFormFields>({
    resolver: zodResolver(expanseValidation),
    defaultValues: {
      category: ExpanseCategory.WITHOUT_CATEGORY,
      amount: 0,
      date: dayjs(),
    },
  });

  const { refetch } = useQuery({ queryKey: ["budget"] });
  const { refetch: refetchBudgetHistory } = useQuery({
    queryKey: ["budgetHistory"],
  });
  const { refetchExpanse } = useTabContainerContext();

  const onSubmit = handleSubmit(async (data) => {
    try {
      clearErrors("root");
      await ExpanseApi.createExpanse({
        category:
          ExpanseCategory[data.category as keyof typeof ExpanseCategory],
        amount: data.amount,
        date: data.date.toISOString(),
      });
      refetchExpanse();
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
              label="Expanse"
              variant="outlined"
              type="number"
              fullWidth
              placeholder="Enter your expanse"
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
                {Object.values(ExpanseCategory).map((category) => (
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

export default ExpanseTab;
