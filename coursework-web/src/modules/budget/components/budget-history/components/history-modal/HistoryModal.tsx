import React from "react";
import { ModalProps } from "../types";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BudgetHistory } from "@/lib/api/budget/types/BudgetHistory";
import { UpdateTransactionModal } from "../update-transaction-modal";
import { DeleteTransactionModal } from "../delete-transaction-modal";
import { Delete, Edit, North, South } from "@mui/icons-material";
import { IncomeCategory } from "@/types/income";
import { ExpanseCategory } from "@/types/expanse";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface HistoryModalProps extends ModalProps {
  budgetHistory?: BudgetHistory[];
  setQuery: React.Dispatch<
    React.SetStateAction<{
      category: string;
      date: string;
    }>
  >;
  refetch: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  budgetHistory,
  open,
  close,
  setQuery,
  refetch,
}) => {
  const [selectedTransaction, setSelectedTransaction] =
    React.useState<BudgetHistory | null>(null);
  const [openUpdateTransactionModal, setOpenUpdateTransactionModal] =
    React.useState(false);
  const [openDeleteTransactionModal, setOpenDeleteTransactionModal] =
    React.useState(false);

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setQuery((prevQuery) => ({
      ...prevQuery,
      category: newCategory,
    }));
  };

  const handleDateChange = (newDate) => {
    const formattedDate = newDate ? dayjs(newDate).format("YYYY-MM-DD") : "";
    setQuery((prevQuery) => ({
      ...prevQuery,
      date: formattedDate,
    }));
  };

  if (!budgetHistory) return null;

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          background: "white",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        p={3}
        borderRadius={3}
      >
        <Typography variant="h3" mb={3}>
          History
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Select defaultValue="" onChange={handleCategoryChange}>
            <MenuItem value="">All</MenuItem>
            {Object.keys(IncomeCategory).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
            {Object.keys(ExpanseCategory).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <DatePicker format={'DD/MM/YYYY'} onChange={handleDateChange} />
          <Button onClick={refetch}>Filter</Button>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ height: "50vh", overflowY: "scroll" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budgetHistory.map((history) => (
                <TableRow
                  key={history.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {history.amount}
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      color={history.type === "income" ? "green" : "error"}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      {history.type}
                      {history.type === "income" ? <North /> : <South />}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{history.category}</TableCell>
                  <TableCell align="center">
                    {history.date.split("T")[0]}
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTransaction(history);
                          setOpenUpdateTransactionModal(true);
                        }}
                      >
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTransaction(history);
                          setOpenDeleteTransactionModal(true);
                        }}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedTransaction && (
          <>
            <UpdateTransactionModal
              transaction={selectedTransaction}
              open={openUpdateTransactionModal}
              close={() => setOpenUpdateTransactionModal(false)}
            />
            <DeleteTransactionModal
              transaction={selectedTransaction}
              open={openDeleteTransactionModal}
              close={() => setOpenDeleteTransactionModal(false)}
            />
          </>
        )}
      </Box>
    </Modal>
  );
};

export default HistoryModal;
