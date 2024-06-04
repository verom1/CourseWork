import { useState } from "react";
import { East, West } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import BudgetApi from "@/lib/api/budget/BudgetApi";
import { HistoryModal } from "./components/history-modal";

import { container } from "./BudgetHistory.styles";

const BudgetHistory = () => {
  const { data } = useQuery({
    queryKey: ["budget"],
    queryFn: BudgetApi.getBudget,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const [query, setQuery] = useState({ category: "", date: "" });

  const { data: budgetHistory, refetch } = useQuery({
    queryKey: ["budgetHistory"],
    queryFn: () => BudgetApi.getBudgetHistory(query),
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
  });

  const [open, setOpen] = useState(false);

  return (
    <Box sx={container} p={2}>
      <Typography variant="h3">History</Typography>
      <Typography variant="subtitle1">Current budget: ${data}</Typography>
      <Box sx={container} mt={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">Last 10 transactions</Typography>
          <Typography
            variant="subtitle1"
            onClick={() => setOpen(true)}
            sx={{
              color: (theme) => theme.palette.primary.main,
              cursor: "pointer",
            }}
          >
            see all history
          </Typography>
        </Box>

        {budgetHistory?.slice(0, 9).map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <Typography variant="subtitle1">${item.amount}</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {item.type === "income" ? (
                <West color="success" />
              ) : (
                <East color="error" />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="body2">{item.date.split("T")[0]}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <HistoryModal
        budgetHistory={budgetHistory}
        open={open}
        close={() => setOpen(false)}
        setQuery={setQuery}
        refetch={refetch}
      />
    </Box>
  );
};

export default BudgetHistory;
