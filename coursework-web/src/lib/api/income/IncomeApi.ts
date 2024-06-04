import { client } from "@/lib/api/instance";
import { getAuthorizationHeader } from "@/lib/api/utils";
import { Income } from "@/types/income";
import { CreateIncomeBody } from "./types/CreateIncomeBody";

class IncomeApi {
  async getIncome(): Promise<Income[]> {
    const { data } = await client.get<Income[]>(
      "/income",
      getAuthorizationHeader()
    );
    return data;
  }

  async getIncomeById(id: string): Promise<Income> {
    const { data } = await client.get<Income>(
      "/income/" + id,
      getAuthorizationHeader()
    );
    return data;
  }

  async getSummary(): Promise<number> {
    const { data } = await client.get<number>(
      "/income/summary",
      getAuthorizationHeader()
    );
    return data;
  }

  async createIncome(income: CreateIncomeBody): Promise<void> {
    await client.post("/income", income, getAuthorizationHeader());
  }

  async updateIncome(id: string, income: CreateIncomeBody): Promise<Income> {
    const { data } = await client.patch<Income>(
      "income/" + id,
      income,
      getAuthorizationHeader()
    );
    return data;
  }

  async deleteIncome(id: string): Promise<void> {
    const { data } = await client.delete<void>(
      "income/" + id,
      getAuthorizationHeader()
    );
    return data;
  }
}

export default new IncomeApi();
