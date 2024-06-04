import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ModalProps } from "../types";
import IncomeApi from "@/lib/api/income/IncomeApi";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { IncomeFormFields } from "../../../tab-container/components/income-tab/types";
import { incomeValidation } from "../../../tab-container/components/income-tab/validation";
import { useTabContainerContext } from "../../../tab-container/components/TabContainerContext";
import { BudgetHistory } from "@/lib/api/budget/types/BudgetHistory";
import ExpanseApi from "@/lib/api/expanse/ExpanseApi";
import { IncomeCategory } from "@/types/income";
import { ExpanseCategory } from "@/types/expanse";
import { expanseValidation } from "../../../tab-container/components/expanse-tab/validation";
import { ExpanseFormFields } from "../../../tab-container/components/expanse-tab/types";

interface UpdateTransactionModalProps extends ModalProps {
  transaction: BudgetHistory;
}

type FormFields =
  | ({ type: "income" } & IncomeFormFields)
  | ({ type: "expanse" } & ExpanseFormFields);

const UpdateTransactionModal: React.FC<UpdateTransactionModalProps> = ({
  transaction,
  open,
  close,
}) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(
      transaction.type === "income" ? incomeValidation : expanseValidation
    ),
    defaultValues: {
      category: transaction.category,
      amount: transaction.amount,
      date: dayjs(transaction.date),
    },
  });

  const { refetch } = useQuery({ queryKey: ["budget"] });
  const { refetch: refetchBudgetHistory } = useQuery({
    queryKey: ["budgetHistory"],
  });
  const { refetchIncome, refetchExpanse } = useTabContainerContext();

  const onSubmit = handleSubmit(async (data) => {
    try {
      clearErrors("root");
      if (transaction.type === "income") {
        await IncomeApi.updateIncome(transaction.id, {
          category:
            IncomeCategory[data.category as keyof typeof IncomeCategory],
          amount: data.amount,
          date: data.date.toISOString(),
        });
      } else {
        await ExpanseApi.updateExpanse(transaction.id, {
          category:
            ExpanseCategory[data.category as keyof typeof ExpanseCategory],
          amount: data.amount,
          date: data.date.toISOString(),
        });
      }
      refetchIncome();
      refetchExpanse();
      refetch();
      refetchBudgetHistory();
    } catch (error) {
      setError("root", { message: getErrorMessage(error) });
    }
  });

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          background: "white",
          p: 3,
          borderRadius: 3,
          width: "50vw",
        }}
      >
        <Typography variant="h3">Update transaction</Typography>
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select {...field} variant="outlined">
                    {Object.values(
                      transaction.type === "income"
                        ? IncomeCategory
                        : ExpanseCategory
                    ).map((category) => (
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
                render={({ field }) => (
                  <DesktopDatePicker
                    {...field}
                    value={dayjs(transaction.date)}
                  />
                )}
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
      </Box>
    </Modal>
  );
};

export default UpdateTransactionModal;
