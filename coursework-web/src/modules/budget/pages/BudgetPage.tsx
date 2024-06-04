import { Button, Grid } from "@mui/material";
import { BudgetHistory } from "../components/budget-history";
import { TabContainer } from "../components/tab-container";

const BudgetPage = () => {
const handleLogout  = () => {
  localStorage.removeItem('ACCESS_TOKEN');
  window.location.reload()
  }

  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <Grid item xs={3}>
        <BudgetHistory />
      </Grid>
      <TabContainer />
      <Button variant="contained" sx={{height: '20px', position: 'absolute', bottom: '0', m: 3}}   onClick ={handleLogout}>Log out</Button>
    </Grid>
  );
};

export default BudgetPage;
