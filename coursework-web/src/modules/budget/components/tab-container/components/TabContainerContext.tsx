import React, { PropsWithChildren, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import IncomeApi from "@/lib/api/income/IncomeApi";
import ExpanseApi from "@/lib/api//expanse/ExpanseApi";
import { Income } from "@/types/income";
import { Expanse } from "@/types/expanse";

interface TabContainerContextProps {
  income: Income[];
  expanse: Expanse[];
  refetchIncome: () => void;
  refetchExpanse: () => void;
}

const TabContainerContext = React.createContext<TabContainerContextProps>({
  income: [],
  expanse: [],
  refetchIncome: () => {},
  refetchExpanse: () => {},
});

export const useTabContainerContext = (): TabContainerContextProps =>
  useContext(TabContainerContext);

const TabContainerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    data: income,
    isFetched: isFetchedIncome,
    refetch: refetchIncome,
  } = useQuery({
    queryKey: ["income"],
    queryFn: IncomeApi.getIncome,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const {
    data: expanse,
    isFetched: isFetchedExpanse,
    refetch: refetchExpanse,
  } = useQuery({
    queryKey: ["expanse"],
    queryFn: ExpanseApi.getExpanse,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const context = useMemo<TabContainerContextProps>(
    () => ({
      income: income as Income[],
      expanse: expanse as Expanse[],
      refetchIncome,
      refetchExpanse,
    }),
    [income, expanse, refetchIncome, refetchExpanse]
  );

  return (
    <TabContainerContext.Provider value={context}>
      {isFetchedIncome && isFetchedExpanse && children}
    </TabContainerContext.Provider>
  );
};

export default TabContainerProvider;
