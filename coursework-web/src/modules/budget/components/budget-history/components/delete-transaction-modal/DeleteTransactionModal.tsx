import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { ModalProps } from "../types";
import { BudgetHistory } from "@/lib/api/budget/types/BudgetHistory";
import IncomeApi from "@/lib/api/income/IncomeApi";
import ExpanseApi from "@/lib/api/expanse/ExpanseApi";
import { useQuery } from "@tanstack/react-query";
import { useTabContainerContext } from "../../../tab-container/components/TabContainerContext";

interface DeleteTransactionModalProps extends ModalProps {
  transaction: BudgetHistory;
}

const DeleteTransactionModal: React.FC<DeleteTransactionModalProps> = ({
  transaction,
  close,
  open,
}) => {
  const { refetch } = useQuery({ queryKey: ["budget"] });
  const { refetch: refetchBudgetHistory } = useQuery({
    queryKey: ["budgetHistory"],
  });
  const { refetchIncome, refetchExpanse } = useTabContainerContext();

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
          gap: 3,
          background: "white",
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h3">Delete Transaction</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography>
            Are you sure you want to delete this transaction?
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={async () => {
                if (transaction.type === "income") {
                  await IncomeApi.deleteIncome(transaction.id);
                } else {
                  await ExpanseApi.deleteExpanse(transaction.id);
                }
                refetchIncome();
                refetchExpanse();
                refetch();
                refetchBudgetHistory();
                close();
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={close}
              fullWidth
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteTransactionModal;
