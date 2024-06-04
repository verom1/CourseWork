import { Budget } from "@/types/budget";
import { client } from "../instance";
import { getAuthorizationHeader } from "../utils";
import { BudgetHistory } from "./types/BudgetHistory";

class BudgetApi {
  async getBudget() {
    const { data } = await client.get<number>(
      "/budget",
      getAuthorizationHeader()
    );
    return data;
  }

  async setBudget(budget: Budget) {
    await client.patch("/budget/set", budget, getAuthorizationHeader());
  }

  async resetBudget() {
    await client.patch("/budget/reset", {}, getAuthorizationHeader());
  }

  async getBudgetHistory(query: { category?: string; date?: string }) {
    const { data } = await client.get<BudgetHistory[]>(
      `/budget/history?category=${query.category}&date=${query.date}`,
      getAuthorizationHeader()
    );
    return data;
  }
}

export default new BudgetApi();
