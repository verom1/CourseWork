import { Box, Typography } from "@mui/material";
import { useTabContainerContext } from "../TabContainerContext";
import { Income } from "@/types/income";
import { Expanse } from "@/types/expanse";

const TransactionHistory = ({ value }: { value: number }) => {
  const { income, expanse } = useTabContainerContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: (theme) => theme.palette.grey[100],
        padding: 2,
        height: "100%",
      }}
    >
      <HistoryBlock data={value === 0 ? income : expanse} />
    </Box>
  );
};

export default TransactionHistory;

const HistoryBlock = ({ data }: { data: Income[] | Expanse[] }) => {
  return data.map((item) => (
    <Box
      key={item.id}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="subtitle1">${item.amount}</Typography>
      <Typography variant="body2">{item.date.split("T")[0]}</Typography>
    </Box>
  ));
};
