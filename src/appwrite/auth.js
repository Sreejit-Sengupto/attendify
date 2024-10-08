import { account } from "./config";
import { v4 as uuid } from "uuid";

export const register = async (name, email, password) => {
  const userId =
    name.length > 3
      ? name.substring(0, 3) + uuid().substring(0, 3)
      : name + uuid().substring(0, 3);

  const promise = await account.create(userId, email, password, name);
  console.log(promise);
};
