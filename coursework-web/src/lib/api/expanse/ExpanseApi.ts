import { Expanse } from "@/types/expanse";
import { client } from "../instance";
import { getAuthorizationHeader } from "../utils";
import { CreateExpanseBody } from "./types/CreateExpanseBody";

class ExpanseApi {
  async getExpanse() {
    const { data } = await client.get<Expanse[]>(
      "/expanse",
      getAuthorizationHeader()
    );
    return data;
  }

  async getExpanseById(id: string): Promise<Expanse> {
    const { data } = await client.get<Expanse>(
      "/expanse/" + id,
      getAuthorizationHeader()
    );
    return data;
  }

  async createExpanse(expanse: CreateExpanseBody) {
    const { data } = await client.post<Expanse>(
      "/expanse",
      expanse,
      getAuthorizationHeader()
    );
    return data;
  }

  async updateExpanse(id: string, expanse: CreateExpanseBody) {
    const { data } = await client.patch<Expanse>(
      "expanse/" + id,
      expanse,
      getAuthorizationHeader()
    );
    return data;
  }

  async deleteExpanse(id: string) {
    const { data } = await client.delete<void>(
      "expanse/" + id,
      getAuthorizationHeader()
    );
    return data;
  }
}

export default new ExpanseApi();
