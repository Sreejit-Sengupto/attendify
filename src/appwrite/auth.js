import { ID } from "appwrite";
import { account } from "./config";

export const register = async (name, email, password) => {
  const promise = await account.create(ID.unique(), email, password, name);
  console.log(promise);
};
