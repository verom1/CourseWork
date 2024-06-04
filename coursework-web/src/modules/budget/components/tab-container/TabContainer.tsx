import { Grid, Tab, Tabs } from "@mui/material";

import TabContainerProvider from "./components/TabContainerContext";
import React from "react";
import { IncomeTab } from "./components/income-tab";
import { ExpanseTab } from "./components/expanse-tab";
import TabPanel, { a11yProps } from "./components/TabPanel";
import { TransactionHistory } from "./components/transaction-history";

const TabContainer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <TabContainerProvider>
      <Grid item xs={6}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Income" {...a11yProps(0)} />
          <Tab label="Expanse" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <IncomeTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ExpanseTab />
        </TabPanel>
      </Grid>
      <Grid item xs={3}>
        <TransactionHistory value={value} />
      </Grid>
    </TabContainerProvider>
  );
};

export default TabContainer;
